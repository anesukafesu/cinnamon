const symbols = [
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  ".",
  ",",
  ";",
  "+",
  "-",
  "&",
  ",",
  "<",
  ">",
  "=",
  "!",
  "|",
  "^",
];

export const symbolLookup = Object.fromEntries(
  symbols.map((symbol) => [symbol, true])
);
