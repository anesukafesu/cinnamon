import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function whitespace(context) {
  // The current token (number) has been terminated by the newline
  // Add current token as a number to the list of tokens
  const numberToken = new Token(
    context.currentToken,
    "integer_literal",
    context.lineCount
  );

  context.tokens.push(numberToken);
  context.currentToken = "";
  context.state = "start";
}
