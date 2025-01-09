export function compileKeywordConstant(tokenStream, _symbolTable, _className) {
  const value = tokenStream.eatValue("true", "false", "null", "this");

  if (value == "this") {
    return ["push pointer 0"];
  }

  if (value == "true") {
    return ["push constant 1", "neg"];
  }

  return ["push constant 0"];
}
