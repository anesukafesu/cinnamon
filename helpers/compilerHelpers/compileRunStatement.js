import { unexpectedToken } from "../errors/index.js";
import {
  compileExternalSubroutineCall,
  compileInternalSubroutineCall,
} from "./index.js";

export function compileRunStatement(tokenStream, symbolTable, className) {
  // Eat do
  const output = [];
  tokenStream.eatValue("run");

  // If the next token is a period, then this is an external subroutine call
  // Of the form owner.method(). For that we call the relevant function for that
  if (tokenStream.nextToken.value == ".") {
    output.push(
      ...compileExternalSubroutineCall(tokenStream, symbolTable, className)
    );
  }
  // If the next token is open parenthesis, then this is an internal subroutine
  // call, which we will compile using the relevant method
  else if (tokenStream.nextToken.value == "(") {
    output.push(
      ...compileInternalSubroutineCall(tokenStream, symbolTable, className)
    );
  }

  // Else we have an invalid token
  else {
    tokenStream.advance();
    unexpectedToken(".", "(");
  }

  tokenStream.eatValue(";");

  // We pop the value returned by the called subroutine
  output.push("pop temp 0");

  return output;
}
