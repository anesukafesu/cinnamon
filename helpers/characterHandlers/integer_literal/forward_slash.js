import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function forward_slash(context) {
  // The integer literal has been terminated by the forward slash.
  // We save the integer literal as a token
  const numberToken = new Token(
    context.currentToken,
    "integer_literal",
    context.lineCount
  );
  context.currentToken = "";
  context.tokens.push(numberToken);

  // If the next character is a /, we enter inline comment state
  if (context.characterStream.nextCharacter == "/") {
    context.state = "inline_comment";
    return;
  }

  // If the next character is a *, we enter multiline comment state
  if (nextCharacter == "*") {
    state = "multiline_comment";
    return;
  }

  // It is just a normal forward slash so we treat it as a normal symbol
  const symbolToken = new Token(
    context.characterStream,
    "symbol",
    context.lineCount
  );
  context.tokens.push(symbolToken);

  // Move to the start state
  context.state = "start";
}
