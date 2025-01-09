import { SymbolTable } from "../classes/index.js";
import {
  isClassVariableDeclaration,
  isClassSubroutineDeclaration,
} from "./utils/index.js";
import {
  compileClassSubroutineDeclaration,
  compileClassVariableDeclaration,
} from "./compilerHelpers/index.js";

export function compileClass(tokenStream) {
  // Create a new symbol table for the class
  const symbolTable = new SymbolTable();

  // Create the output variable
  const output = [];

  // Eat the class keyword
  tokenStream.eatValue("class");

  // Save the class name
  const className = tokenStream.eatType("identifier");

  // Compile all variables by adding them to the symbol table
  while (isClassVariableDeclaration(tokenStream.currentToken)) {
    compileClassVariableDeclaration(tokenStream, symbolTable, className);
  }

  // Compile all subroutines
  while (isClassSubroutineDeclaration(tokenStream.currentToken)) {
    symbolTable.startSubroutine();
    output.push(
      compileClassSubroutineDeclaration(tokenStream, symbolTable, className)
    );
  }

  return output;
}
