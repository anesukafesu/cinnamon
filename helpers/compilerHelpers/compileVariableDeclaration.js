export function compileVariableDeclaration(
  tokenStream,
  symbolTable,
  _className
) {
  // Eat the variable declaration
  tokenStream.eatValue("declare");

  // Get the data type
  const type = tokenStream.eatType("keyword", "identifier");

  // Get the name
  const name = tokenStream.eatType("identifier");

  // Define the variable
  symbolTable.define(name, type, "local");

  while (tokenStream.currentToken.value == ",") {
    tokenStream.advance();

    // Get the name of the additional variable
    const name = tokenStream.eatType("identifier");

    // Add the additional variable to the symbol table
    symbolTable.define(name, type, "local");
  }

  // Eat the ;
  tokenStream.eatValue(";");
}
