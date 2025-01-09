export function compileUnaryOperatorOnTerm(
  tokenStream,
  symbolTable,
  className
) {
  // Get the operator and convert it to its VM equivalent
  const operator = tokenStream.eatValue("!", "-") == "!" ? "not" : "neg";

  // Get the term
  const term = compileTerm(tokenStream, symbolTable, className);

  // Assemble the output and return
  return [...term, operator];
}
