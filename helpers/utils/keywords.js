const keywords = [
  "class",
  "constructor",
  "function",
  "method",
  "field",
  "declare",
  "true",
  "false",
  "null",
  "this",
  "set",
  "run",
  "if",
  "else",
  "while",
  "return",
  "do",
  "end",
  "int",
  "bool",
  "char",
  "void",
];

export const keywordLookup = Object.fromEntries(
  keywords.map((keyword) => [keyword, true])
);
