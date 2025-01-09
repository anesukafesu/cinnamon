export function compileIntegerLiteral(tokenStream, _symbolTable, _className) {
  // Get the value of the integer constant
  const value = tokenStream.eatType("integer_literal");

  // Return the value as a push from the constant virtual memory segment
  return [`push constant ${value}`];
}
