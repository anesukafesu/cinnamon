import { compileExpression } from "./compileExpression.js";

export function compileExpressionInParentheses(
  tokenStream,
  symbolTable,
  className
) {
  tokenStream.eatValue("(");
  const output = compileExpression(tokenStream, symbolTable, className);
  tokenStream.eatValue(")");
  return output;
}
