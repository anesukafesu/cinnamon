import { compileArgumentList } from "./compileArgumentList.js";

export function compileExternalSubroutineCall(
  tokenStream,
  symbolTable,
  className
) {
  // A method call is of the form owner.method() where owner could be a class or object
  // if owner is defined in the symbol table, then owner is an object
  // if not, then we can only assume that owner is a class implemented
  // elsewhere and will be available at runtime

  // Get the owner of the method
  const owner = tokenStream.eatType("identifier");

  // Ignore the .
  tokenStream.eatValue(".");

  // Get the name of the method
  const method = tokenStream.eatType("identifier");

  // Ignore the opening parentheses
  tokenStream.eatValue("(");

  // Get nArgs, and compiledArguments
  let { nArgs, compiledArguments } = compileArgumentList(
    tokenStream,
    symbolTable,
    className
  );

  // Compile the closing parenthesis
  tokenStream.eatValue(")");

  const symbol = symbolTable.getSymbol(owner);
  if (symbol) {
    // owner is an object, not a class
    // nArgs must be incremented by one as the owner is the first argument
    nArgs += 1;
    // TODO: Find way of determining class name
    return [
      `push ${symbol.representation}`,
      ...compiledArguments,
      `call ${symbol.type}.${method} ${nArgs}`,
    ];
  } else {
    return [...compiledArguments, `call ${owner}.${method} ${nArgs}`];
  }
}
