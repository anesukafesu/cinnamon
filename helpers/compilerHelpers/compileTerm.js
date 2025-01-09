import { isAUnaryOperator } from "../utils/index.js";
import {
  compileUnaryOperatorOnTerm,
  compileKeywordConstant,
  compileIntegerLiteral,
  compileStringLiteral,
  compileExpressionInParentheses,
  compileExternalSubroutineCall,
  compileInternalSubroutineCall,
  compileArrayAccessor,
  compileVariableAccessor,
  compileArrayLiteral,
} from "./index.js";

export function compileTerm(tokenStream, symbolTable, className) {
  if (isAUnaryOperator(tokenStream.currentToken)) {
    return compileUnaryOperatorOnTerm(tokenStream, symbolTable, className);
  }

  if (tokenStream.currentToken.type == "keyword") {
    return compileKeywordConstant(tokenStream, symbolTable, className);
  }

  if (tokenStream.currentToken.type == "integer_literal") {
    return compileIntegerLiteral(tokenStream, symbolTable, className);
  }

  if (tokenStream.currentToken.type == "string_literal") {
    return compileStringLiteral(tokenStream, symbolTable, className);
  }

  if (tokenStream.currentToken.value == "[") {
    return compileArrayLiteral(tokenStream, symbolTable, className);
  }

  if (tokenStream.currentToken.value == "(") {
    return compileExpressionInParentheses(tokenStream, symbolTable, className);
  }

  if (tokenStream.nextToken.value == ".") {
    return compileExternalSubroutineCall(tokenStream, symbolTable, className);
  }

  if (tokenStream.nextToken.value == "(") {
    return compileInternalSubroutineCall(tokenStream, symbolTable, className);
  }

  if (tokenStream.nextToken.value == "[") {
    return compileArrayAccessor(tokenStream, symbolTable, className);
  }

  // If the current token is an identifier, but the next token is
  // not a dot, opening parenthesis or opening square brackets,
  // then the current token is simply a variable
  if (tokenStream.currentToken.type == "identifier") {
    return compileVariableAccessor(tokenStream, symbolTable, className);
  }
}
