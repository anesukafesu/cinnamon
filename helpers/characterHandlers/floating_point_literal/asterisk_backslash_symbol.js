import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function asterisk_backslash_symbol(context) {
  // The symbol termanated the floating point number
  // So we add the number as a token
  const numberToken = new Token(
    context.currentToken,
    "floating_point_literal",
    context.lineCount
  );

  context.currentToken = "";
  context.tokens.push(numberToken);

  // Add current character as a symbol token to the list of tokens.
  const symbolToken = new Token(
    context.characterStream.currentCharacter,
    "symbol",
    context.lineCount
  );

  context.tokens.push(symbolToken);

  // Move to the start state
  context.state = "start";
}
