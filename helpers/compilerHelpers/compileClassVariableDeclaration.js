export function compileClassVariableDeclaration(
  tokenStream,
  symbolTable,
  _className
) {
  // Get the variable kind
  const kind = tokenStream.eatValue("field");

  // Get the data type
  const type = tokenStream.eatType("identifier", "keyword");

  // Get the variable's name
  const name = tokenStream.eatType("identifier");

  // Define the variable in the symbol table
  symbolTable.define(name, type, kind);

  // Define any additional variables defined in the same statement
  while (tokenStream.currentToken.value == ",") {
    // Get the additional symbol's name
    tokenStream.advance();
    const name = tokenStream.eatType("identifier");

    // Define that symbol in the symbol table
    symbolTable.define(name, type, kind);
  }

  // Ensure there is a semi-colon
  tokenStream.eatValue(";");
}
