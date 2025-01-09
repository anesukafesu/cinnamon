import { TokeniserContext } from "../../../classes";
import { Token } from "../../../classes";
/**
 * Handles symbols encountered while in the start state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */

export function symbol_asterisk_or_backslash(context) {
  // Remain in start state but add character as symbol token
  const token = new Token(
    context.characterStream.currentCharacter,
    "symbol",
    context.lineCount
  );

  context.tokens.push(token);
}
