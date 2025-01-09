import { compileExpression } from "./index.js";

export function compileArrayAccessor(tokenStream, symbolTable, className) {
  // Get the array name
  const arrayName = tokenStream.eatType("identifier");

  // Get the array symbol from the symbol table
  const symbol = symbolTable.getSymbol(arrayName);

  // Ignore the opening square bracket
  tokenStream.eatValue("[");

  // Compile the expression between curly braces
  const indexExpressionCode = compileExpression(
    tokenStream,
    symbolTable,
    className
  );

  // Ignore the closing square bracket
  tokenStream.eatValue("]");

  // Put it all together into code that pushes the element at the specified index in said array
  // to the top of the pointer
  return [
    `push ${symbol.representation}`,
    ...indexExpressionCode,
    `call Array.at 2`,
  ];
}
