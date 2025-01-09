import { isVariableDeclaration } from "../utils/index.js";
import {
  compileParameter,
  compileVariableDeclaration,
  compileStatements,
} from "./index.js";

export function compileClassSubroutineDeclaration(
  tokenStream,
  symbolTable,
  className
) {
  // Get the function kind
  const subroutineKind = tokenStream.eatValue(
    "function",
    "method",
    "constructor"
  );

  // Get the name of the function
  const subroutineName = tokenStream.eatType("identifier");

  // For a method, argument 0 must be 'this', which is an object of this class
  if (subroutineKind == "method") {
    symbolTable.define("this", className, "arg");
  }

  // Get the opening (
  tokenStream.eatValue("(");

  // Compile the first parameter if it is there
  if (tokenStream.currentToken.value != ")") {
    compileParameter(tokenStream, symbolTable, className);
  }

  // Compile the rest of the parameters if they are there
  while (tokenStream.currentToken.value == ",") {
    tokenStream.eatValue(",");
    compileParameter(tokenStream, symbolTable, className);
  }

  // Eat the closing )
  tokenStream.eatValue(")");

  // Ignore the return type
  tokenStream.eatType("identifier", "keyword");

  // Eat the do keyword
  tokenStream.eatValue("do");

  // Compiling the variables
  while (isVariableDeclaration(tokenStream.currentToken)) {
    compileVariableDeclaration(tokenStream, symbolTable, className);
  }

  // Get number of local variables
  const nLocals = symbolTable.varCount("local");

  // Create the VM function declaration
  let output = [`function ${className}.${subroutineName} ${nLocals}`];

  // If it is a constructor, we append code that creates a new object of this class on the heap
  if (subroutineKind == "constructor") {
    const classSize = symbolTable.varCount("field");
    output.push(
      `push constant ${classSize}`,
      `call Memory.alloc 1`,
      `pop pointer 0`
    );
  }

  // Make the this memory segment point to the current object
  if (subroutineKind == "method") {
    output.push("push argument 0", "pop pointer 0");
  }

  // Compile the rest of the statements
  output.push(...compileStatements(tokenStream, symbolTable, className));

  tokenStream.eatValue("end");

  return output;
}
