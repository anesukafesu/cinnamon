import { getCharacterType, isKeyword } from "./utils/index.js";
import { error, unexpectedCharacter } from "./errors/index.js";
import { Token } from "../classes/index.js";
import { TokeniserContext, CharacterStream } from "../classes/index.js";

/**
 * Tokenises characters
 * @param {CharacterStream} characterStream Stream of all characters to be tokenised
 */
export function tokenise(characterStream) {
  // Create context
  const context = new TokeniserContext(characterStream);

  // Loop through all the characters, tokenising them
  while (context.characterStream.hasMoreCharacters) {
    const characterType = getCharacterType(
      context.characterStream.currentCharacter
    );
    characterHandler[context.state][characterType](context);
    context.characterStream.advance();
  }

  // Handle anything that remains in currentToken
  if (context.currentToken != "") {
    switch (state) {
      case "string_literal": {
        // A string was started but not terminated by the end of the file
        error("Unterminated string at the end of the file.");
        break;
      }

      case "integer_literal": {
        // We treat this as the end of the integer constant
        const token = new Token(
          context.currentToken,
          "integer_literal",
          context.lineCount
        );
        context.currentToken = "";
        context.tokens.push(token);
        break;
      }

      case "keyword_or_identifier": {
        // We treat this as the end of the keyword or identifier
        const token = new Token(
          context.currentToken,
          isKeyword(currentToken) ? "keyword" : "identifier",
          context.lineCount
        );

        context.tokens.push(token);
        break;
      }
    }
  }

  return context.tokens;
}
