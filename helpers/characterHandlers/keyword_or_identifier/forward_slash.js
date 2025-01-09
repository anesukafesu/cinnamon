import { Token, TokeniserContext } from "../../../classes";

/**
 * Handles a dot encountered in the start state by entering the floating_point_literal state.
 * @param {TokeniserContext} context The current context of the tokeniser
 */
export function forward_slash(context) {
  // Save current token as a token
  const token = new Token(
    context.currentToken,
    isKeyword(currentToken) ? "keyword" : "integer_constant",
    context.lineCount
  );

  context.currentToken = "";
  context.tokens.push(token);

  // If the next character is a /, we enter inline comment state
  if (context.characterStream.nextCharacter == "/") {
    context.state = "inline_comment";
    return;
  }

  // If the next character is a *, we enter multiline comment state
  if (nextCharacter == "*") {
    // Enter the multi-line comment state
    context.state = "multline_comment";
    return;
  }

  // It is just a normal forward slash so we treat it as a symbol
  // Add current character as a symbol token to the list of tokens.
  const symbolToken = new Token(
    context.characterStream.currentCharacter,
    "symbol",
    context.lineCount
  );
  context.tokens.push(symbolToken);

  // Move to the start state
  state = "start";
}
