import { beginsStatement } from "../utils/index.js";
import {
  compileIfStatement,
  compileWhileStatement,
  compileRunStatement,
  compileSetStatement,
  compileReturnStatement,
} from "./index.js";

export function compileStatements(tokenStream, symbolTable, className) {
  let output = [];
  while (beginsStatement(tokenStream.currentToken)) {
    switch (tokenStream.currentToken.value) {
      case "if": {
        output.push(...compileIfStatement(tokenStream, symbolTable, className));
        break;
      }
      case "while": {
        output.push(
          ...compileWhileStatement(tokenStream, symbolTable, className)
        );
        break;
      }
      case "run": {
        output.push(
          ...compileRunStatement(tokenStream, symbolTable, className)
        );
        break;
      }
      case "set": {
        output.push(
          ...compileSetStatement(tokenStream, symbolTable, className)
        );
        break;
      }
      case "return": {
        output.push(
          ...compileReturnStatement(tokenStream, symbolTable, className)
        );
        break;
      }
    }
  }
  return output;
}
