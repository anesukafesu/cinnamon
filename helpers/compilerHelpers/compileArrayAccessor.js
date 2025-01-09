import { compileExpression } from "./index.js";

export function compileArrayAccessor(tokenStream, symbolTable, _className) {
  // Get the array name
  const arrayName = tokenStream.eatType("identifier");

  // Get the array symbol from the symbol table
  const symbol = symbolTable.getSymbol(arrayName);

  // Ignore the opening square bracket
  this.eatValue("[");

  // Compile the expression between curly braces
  const indexExpressionCode = compileExpression();

  // Ignore the closing square bracket
  this.eatValue("]");

  // Put it all together into code that pushes the element at the specified index in said array
  // to the top of the pointer
  return [
    ...indexExpressionCode,
    `push ${symbol.representation}`,
    `add`,
    `pop pointer 1`,
    `push that 0`,
  ];
}
