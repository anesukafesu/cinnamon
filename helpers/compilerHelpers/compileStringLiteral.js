export function compileStringLiteral(tokenStream, _symbolTable, _className) {
  // Get the string we want to compile
  const stringLiteral = tokenStream.eatType("string_literal");

  // Allocate space on the heap for the string and point to the object using that
  let output = [`call String.new 0`];

  // Loop through the string, populating the characters into the registers allocated
  for (const char of stringLiteral) {
    const charCode = char.charCodeAt(0);
    output.push(`push constant ${charCode}`, `call String.append_char 2`);
  }

  return output;
}
