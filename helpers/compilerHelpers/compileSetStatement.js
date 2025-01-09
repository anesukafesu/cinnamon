import { compileExpression } from "./index.js";
import { undefinedSymbol } from "../errors/index.js";

export function compileSetStatement(tokenStream, symbolTable, className) {
  tokenStream.eatValue("set");
  const identifier = tokenStream.eatType("identifier");
  const symbol = symbolTable.getSymbol(identifier);

  if (!symbol) {
    undefinedSymbol(symbol, className);
  }

  if (tokenStream.currentToken.value == "[") {
    tokenStream.eatValue("[");
    const indexExpression = compileExpression(
      tokenStream,
      symbolTable,
      className
    );
    tokenStream.eatValue("]");
    tokenStream.eatValue("=");
    const valueExpression = compileExpression(
      tokenStream,
      symbolTable,
      className
    );
    tokenStream.eatValue(";");

    return [
      ...indexExpression,
      `push ${symbol.representation}`,
      `add`,
      ...valueExpression,
      `pop temp 0`,
      `pop pointer 1`,
      `push temp 0`,
      `pop that 0`,
    ];
  } else {
    tokenStream.eatValue("=");
    const valueExpression = compileExpression(
      tokenStream,
      symbolTable,
      className
    );
    tokenStream.eatValue(";");

    return [...valueExpression, `pop ${symbol.representation}`];
  }
}
