import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function dot(context) {
  // The current token (a number) has been terminated by the current character (symbol)
  // Add current token as a number token to the list of tokens
  const numberToken = new Token(
    context.currentToken,
    "integer_literal",
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
