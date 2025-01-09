import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles forward slashes encountered while in start state.
 * @param {TokeniserContext} context The context of the tokeniser
 */
export function forward_slash(context) {
  // If the next character is a /, we enter inline comment state
  if (context.characterStream.nextCharacter == "/") {
    context.state = "inline_comment";
    return;
  }

  // If the next character is a *, we enter multiline comment state
  if (context.characterStream.nextCharacter == "*") {
    context.state = "multiline_comment";
    return;
  }

  // It is just a normal forward slash so we treat it as a symbol
  const token = new Token(
    context.characterStream.currentCharacter,
    "symbol",
    context.lineCount
  );
  context.tokens.push(token);
}
