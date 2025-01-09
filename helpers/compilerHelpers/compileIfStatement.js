import { compileExpression, compileStatements } from "./index.js";

export function compileIfStatement(tokenStream, symbolTable, className) {
  // Define the code blocks
  let expressionCode = [];
  let ifTrueCode = [];
  let elseCode = [];

  // Eat if (
  tokenStream.eatValue("if");
  tokenStream.eatValue("(");

  // Compile the expression between parentheses
  expressionCode = compileExpression(tokenStream, symbolTable, className);

  // Compile ) do
  tokenStream.eatValue(")");
  tokenStream.eatValue("do");

  // Compile the statements between curly braces
  ifTrueCode = compileStatements(tokenStream, symbolTable, className);

  // Optionally compile the else close
  if (tokenStream.currentToken.value == "else") {
    // compile the else do
    tokenStream.eatValue("else");
    tokenStream.eatValue("do");

    // compile the statements that are defined in the else block
    elseCode = compileStatements(tokenStream, symbolTable, className);
  }

  // Compile the end
  tokenStream.eatValue("end");

  const index = tokenStream.currentPosition;

  return [
    ...expressionCode,
    `not`,
    `if-goto ${className}$L1_${index}`,
    ...ifTrueCode,
    `goto ${className}$L2_${index}`,
    `label ${className}$L1_${index}`,
    ...elseCode,
    `label ${className}$L2_${index}`,
  ];
}
