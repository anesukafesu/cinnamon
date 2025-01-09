import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function single_quote(context) {
  const token = new Token(
    context.currentToken,
    "character_literal",
    context.lineCount
  );

  context.tokens.push(token);
  context.currentToken = "";
  context.state = "start";
}
