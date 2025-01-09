import { compileExpression, compileStatements } from "./index.js";

export function compileWhileStatement(tokenStream, symbolTable, className) {
  tokenStream.eatValue("while");
  const expressionCode = compileExpression(tokenStream, symbolTable, className);
  tokenStream.eatValue("do");
  const loopStatements = compileStatements(tokenStream, symbolTable, className);
  tokenStream.eatValue("end");

  const index = tokenStream.currentPosition;

  return [
    `label ${className}$L1_${index}`,
    ...expressionCode,
    `not`,
    `if-goto ${className}$L2_${index}`,
    ...loopStatements,
    `goto ${className}$L1_${index}`,
    `label ${className}$L2_${index}`,
  ];
}
