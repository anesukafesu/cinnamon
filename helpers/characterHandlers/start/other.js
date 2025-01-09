import { Token, TokeniserContext } from "../../../classes";
import { unexpectedCharacter } from "../../errors";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function other(context) {
  unexpectedCharacter(
    context.lineCount,
    context.characterStream.currentCharacter
  );
}
