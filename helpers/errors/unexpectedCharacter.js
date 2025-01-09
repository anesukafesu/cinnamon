import { error } from "./index.js";

/**
 * Raises an error when an unexpected token is found.
 * @param {Number} lineNumber The line number in the source code where the character was found.
 * @param {string} character The character that was found.
 */
export function unexpectedCharacter(lineNumber, character) {
  error(`Unexpected '${character}' found on line ${lineNumber}.`);
}
