import { keywordLookup } from "./index.js";

export function isClassSubroutineDeclaration(token) {
  return ["method", "function", "constructor"].includes(token.value);
}

export function isClassVariableDeclaration(token) {
  return token.value == "field";
}

export function isABinaryOperator(token) {
  return ["+", "-", "*", "/", "&", "|", "<", ">", "=", "^", "%"].includes(
    token.value
  );
}

export function isAUnaryOperator(token) {
  return ["!", "-"].includes(token.value);
}

export function beginsStatement(token) {
  return ["set", "if", "while", "run", "return"].includes(token.value);
}

export function isValidVariableType(token) {
  if (["int", "char", "bool"].includes(token.value)) return true;
  if (token.type == "identifier") return true;

  return false;
}

export function isValidReturnType(token) {
  if (["int", "char", "bool", "void"].includes(token.value)) return true;
  if (token.type == "identifier") return true;

  return false;
}

export function isVariableDeclaration(token) {
  return token.value == "declare";
}

export function isAKeywordConstant(token) {
  return (
    token.type == TerminalType.Keyword &&
    ["true", "false", "this", "null"].includes(token.value)
  );
}

export function isKeyword(token) {
  return !!keywordLookup[token];
}
