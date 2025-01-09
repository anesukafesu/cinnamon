export class Token {
  constructor(value, type, lineNumber) {
    this.value = value;
    this.type = type;
    this.lineNumber = lineNumber;
  }
}
