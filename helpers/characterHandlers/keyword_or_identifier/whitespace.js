import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function whitespace(context) {
  // The whitespace terminated the keyword or identifier
  // Therefore, we add currentToken as either a keyword or identifier
  const keywordOrSymbolToken = new Token(
    context.currentToken,
    isKeyword(context.currentToken) ? "keyword" : "identifier",
    context.lineCount
  );

  context.currentToken = "";
  context.tokens.push(keywordOrSymbolToken);
  context.state = "start";
}
