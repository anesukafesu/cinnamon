import { error } from "./index.js";

export function unexpectedCharacter(lineNumber, character) {
  error(`Unexpected '${character}' found on line ${lineNumber}.`);
}
