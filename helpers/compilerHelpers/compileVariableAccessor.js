export function compileVariableAccessor(tokenStream, symbolTable, _className) {
  const variableName = tokenStream.eatType("identifier");
  const symbol = symbolTable.getSymbol(variableName);
  return [`push ${symbol.representation}`];
}
