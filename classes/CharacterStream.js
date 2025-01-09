export class CharacterStream {
  /**
   * Creates an instance of CharacterStream
   * @param {string[]} characters List of characters in the code file
   */
  constructor(characters) {
    this.characters = characters.replace(/\r\n/g, "\n");
    this.position = 0;
  }

  get currentCharacter() {
    return this.characters[this.position];
  }

  get nextCharacter() {
    return this.characters[this.position + 1];
  }

  get hasMoreCharacters() {
    return this.position < this.characters.length;
  }

  advance() {
    this.position += 1;
  }
}
