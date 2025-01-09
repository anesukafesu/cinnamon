import { error } from "./index.js";

export function undefinedSymbol(symbolName, className, lineNumber) {
  error(
    `Undefined variable ${symbolName} found in file ${className} on line number ${lineNumber}.`
  );
}
