import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function digit_letter_underscore(context) {
  context.currentToken += context.characterStream.currentCharacter;
}
