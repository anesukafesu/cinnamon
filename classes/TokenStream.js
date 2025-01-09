import { unexpectedToken } from "../helpers/errors/index.js";

export class TokenStream {
  constructor(tokens, fileName) {
    this.fileName = fileName;
    this.tokens = tokens;
    this.position = 0;
  }

  get currentPosition() {
    return this.position;
  }

  get currentToken() {
    return this.tokens[this.currentPosition];
  }

  get hasMoreTokens() {
    return this.currentPosition < this.tokens.length - 1;
  }

  get nextToken() {
    if (this.hasMoreTokens) {
      return this.tokens[this.currentPosition + 1];
    } else {
      return null;
    }
  }

  eatType(...types) {
    if (this.assertTokenType(...types)) {
      const value = this.currentToken.value;
      this.advance();
      return value;
    } else {
      unexpectedToken(
        this.fileName,
        this.currentToken.lineNumber,
        this.currentToken.value,
        ...types
      );
    }
  }

  eatValue(...values) {
    if (this.assertTokenValue(...values)) {
      const value = this.currentToken.value;
      this.advance();
      return value;
    } else {
      unexpectedToken(
        this.fileName,
        this.currentToken.lineNumber,
        this.currentToken.value,
        ...values
      );
    }
  }

  assertTokenValue(...values) {
    return values.includes(this.currentToken.value);
  }

  assertTokenType(...types) {
    return types.includes(this.currentToken.type);
  }

  advance() {
    this.position += 1;
  }

  exportAsXML() {
    let output = `<tokens>`;
    for (const token of this.tokens) {
      output += `<${token.type}> ${token.value} </${token.type}>`;
    }
    output += `</tokens>`;
    return output;
  }
}
