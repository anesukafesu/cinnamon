import { error } from "./index.js";

export function unexpectedToken(fileName, lineNumber, found, ...expected) {
  error(
    `Unexpected token found on line ${lineNumber} in file ${fileName}. Found '${found}', but expected '${expected}'.`
  );
}
