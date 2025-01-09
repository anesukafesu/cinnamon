import { compileExpression } from "./index.js";

export function compileArgumentList(tokenStream, symbolTable, className) {
  // Store the VM Code to add arguments onto the stack
  let compiledArguments = [];

  // Store the number of arguments
  let nArgs = 0;

  // Compile the first argument if it is there
  if (tokenStream.currentToken.value != ")") {
    compiledArguments.push(
      ...compileExpression(tokenStream, symbolTable, className)
    );
    nArgs += 1;
  }

  // Compile additional arguments if there are there
  while (tokenStream.currentToken.value == ",") {
    tokenStream.eatValue(",");
    compiledArguments.push(
      ...compileExpression(tokenStream, symbolTable, className)
    );
    nArgs += 1;
  }

  return { nArgs, compiledArguments };
}
