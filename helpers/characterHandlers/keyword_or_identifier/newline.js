import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function newline(context) {
  const keywordOrSymbolToken = new Token(
    context.currentToken,
    isKeyword(currentToken) ? "keyword" : "identifier",
    context.lineCount
  );

  context.currentToken = "";

  context.tokens.push(keywordOrSymbolToken);
  context.state = "start";
  context.lineCount += 1;
}
