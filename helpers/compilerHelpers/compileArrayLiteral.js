import { compileExpression } from "./index.js";

export function compileArrayLiteral(tokenStream, symbolTable, className) {
  const output = [];
  tokenStream.eatValue("[");
  output.push("call Array.new 0");

  if (tokenStream.currentToken.value != "]") {
    const expression = compileExpression(tokenStream, symbolTable, className);
    output.push(...expression);
    output.push("call Array.append 2");
  }

  while (tokenStream.currentToken.value == ",") {
    tokenStream.eatValue(",");
    const expression = compileExpression(tokenStream, symbolTable, className);
    output.push(...expression);
    output.push(`call Array.append 2`);
  }

  tokenStream.eatValue("]");

  return output;
}
