import { Token, TokeniserContext } from "../../../classes";
import { isKeyword } from "../../utils";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function backslash_dot_asterisk_symbol(context) {
  // The symbol terminated the keyword or identifier
  // Therefore, we add currentToken as either a keyword or identifier
  const keywordOrSymbolToken = new Token(
    context.currentToken,
    isKeyword(currentToken) ? "keyword" : "identifier",
    context.lineCount
  );

  context.currentToken = "";
  context.tokens.push(keywordOrSymbolToken);

  // We also add the current character as a symbol token
  const symbolToken = new Token(
    context.characterStream.currentCharacter,
    "symbol",
    context.lineCount
  );
  context.tokens.push(symbolToken);

  context.state = "start";
}
