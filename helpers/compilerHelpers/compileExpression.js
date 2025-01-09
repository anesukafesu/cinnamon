import { compileTerm } from "./index.js";
import { isABinaryOperator } from "../utils/index.js";

export function compileExpression(tokenStream, symbolTable, className) {
  const symbolToCommandMap = {
    "+": "add",
    "-": "sub",
    "*": "mul",
    "/": "div",
    "<": "lt",
    ">": "gt",
    "=": "eq",
    "&": "and",
    "|": "or",
    "^": "pow",
    "%": "mod",
  };

  // Get the first term by default
  const firstTerm = compileTerm(tokenStream, symbolTable, className);
  let output = [...firstTerm];

  // As long as there are additional terms, we compile them as well
  while (isABinaryOperator(tokenStream.currentToken)) {
    // Get the symbol, +, -, /, etc.
    const symbol = tokenStream.eatType("symbol");

    // Convert the symbol to the equivalent VM Command
    const command = symbolToCommandMap[symbol];

    // Compile the additional term
    const additionalTerm = compileTerm(tokenStream, symbolTable, className);

    // Add the additional term and operator output
    output.push(...additionalTerm, command);
  }

  return output;
}
