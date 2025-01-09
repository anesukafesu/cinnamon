import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function double_quote(context) {
  // The string has been terminated
  // Then we add current token to list of tokens
  const token = new Token(
    context.currentToken,
    "string_literal",
    context.lineCount
  );
  context.currentToken = "";
  context.tokens.push(token);
  context.state = "start";
}
