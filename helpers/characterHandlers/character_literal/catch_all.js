import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function catch_all(context) {
  if (context.currentToken.length > 0 && currentToken != "\\") {
    unexpectedCharacter(lineCount, context.characterStream.currentCharacter);
  } else {
    context.currentToken += context.characterStream.currentCharacter;
  }
}
