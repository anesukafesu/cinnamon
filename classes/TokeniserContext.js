import { CharacterStream } from "./index.js";

export class TokeniserContext {
  /**
   * Creates the context used by the character handlers
   * @param {CharacterStream} characterStream The stream of characters from the file
   */
  constructor(characterStream) {
    this.characterStream = characterStream;
    this.state = "start";
    this.currentToken = "";
    this.lineCount = 1;
    this.tokens = [];
  }
}
