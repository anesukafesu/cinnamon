import { symbolLookup } from "./index.js";

const newlinesLookup = {
  "\n": true,
  "\r": true,
  "\r\n": true,
};

function isSymbol(char) {
  return !!symbolLookup[char];
}

function isDigit(char) {
  return /[0-9]/.test(char);
}

function isWhitespace(char) {
  return char.trim() == "";
}

function isLetter(char) {
  return /[A-Z]|[a-z]/.test(char);
}

function isUnderscore(char) {
  return char == "_";
}

function isDoubleQuote(char) {
  return char == '"';
}

function isSingleQuote(char) {
  return char == "'";
}

function isForwardSlash(char) {
  return char == "/";
}

function isAsterisk(char) {
  return char == "*";
}

function isNewline(char) {
  return !!newlinesLookup[char];
}

function isBackSlash(char) {
  return char == "\\";
}

function isDot(char) {
  return char == ".";
}

export function getCharacterType(char) {
  if (isLetter(char)) {
    return "letter";
  }

  if (isNewline(char)) {
    return "newline";
  }

  // This is a catch-all for all white-space, including newlines
  // Therefore it should be checked for after checking for newLines
  if (isWhitespace(char)) {
    return "whitespace";
  }

  if (isSymbol(char)) {
    return "symbol";
  }

  if (isDot(char)) {
    return "dot";
  }

  if (isDigit(char)) {
    return "digit";
  }

  if (isUnderscore(char)) {
    return "underscore";
  }

  if (isDoubleQuote(char)) {
    return "double_quote";
  }

  if (isSingleQuote(char)) {
    return "single_quote";
  }

  if (isBackSlash(char)) {
    return "back_slash";
  }

  if (isForwardSlash(char)) {
    return "forward_slash";
  }

  if (isAsterisk(char)) {
    return "asterisk";
  }

  return "other";
}
