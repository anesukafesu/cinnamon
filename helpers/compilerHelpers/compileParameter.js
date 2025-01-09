export function compileParameter(tokenStream, symbolTable, _className) {
  // Get the type
  const type = tokenStream.eatType("keyword", "identifier");

  // Get the identifier name
  const name = tokenStream.eatType("identifier");

  // Define the variable
  symbolTable.define(name, type, "argument");
}
