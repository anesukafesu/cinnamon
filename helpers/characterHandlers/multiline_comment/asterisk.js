import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function asterisk(context) {
  if (context.characterStream.nextCharacter == "/") {
    context.state = "start";
    // We skip over the next character, which is a forward slash, as it is
    // part of the comment.
    context.characterStream.advance();
    return;
  }
}
