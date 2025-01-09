import { compileArgumentList } from "./index.js";

export function compileInternalSubroutineCall(
  tokenStream,
  symbolTable,
  className
) {
  // This is an internal method call. Therefore, we pass the current object
  // as the first argument to the subroutine that has been called.
  // to call the subroutine, we will need to specify the class name.
  // the class name is the name of the class we are compiling.

  // Get the name of the subroutine
  const subroutineName = tokenStream.eatType("identifier");

  // Ignore the opening parentheses
  tokenStream.eatValue("(");

  // Get nArgs, and compiledArguments
  let { nArgs, compiledArguments } = compileArgumentList(
    tokenStream,
    symbolTable,
    className
  );

  // This is a method call, so we increment nArgs because we will pass the current
  nArgs += 1;

  // Compile the closing parenthesis
  tokenStream.eatValue(")");

  return [
    `push pointer 0`,
    ...compiledArguments,
    `call ${className}.${subroutineName} ${nArgs}`,
  ];
}
