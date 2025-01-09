import { compileExpression } from "./index.js";

export function compileReturnStatement(tokenStream, symbolTable, className) {
  // Eat return
  tokenStream.eatValue("return");

  // If the next token is a semi-colon, then we are returning void
  // So we push the constant 0 and return it
  if (tokenStream.currentToken.value == ";") {
    tokenStream.eatValue(";");
    return ["push constant 0", "return"];
  }

  // Else, we compile the expression after the return keyword
  const expressionCode = compileExpression(tokenStream, symbolTable, className);
  tokenStream.eatValue(";");

  // Return the code to evaluate the expression and a return
  return [...expressionCode, "return"];
}
