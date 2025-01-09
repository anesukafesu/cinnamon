import { Symbol } from "./Symbol.js";
import { exit } from "process";

export class SymbolTable {
  constructor() {
    this.classSymbols = new Map();
    this.subroutineSymbols = new Map();
    this.tally = { local: 0, field: 0, argument: 0 };
  }

  define(name, type, kind, lineNumber) {
    const index = this.varCount(kind);

    if (kind == "field") {
      // Get the symbol from the map if it currently exists
      const symbol = this.classSymbols.get(name);

      if (symbol) {
        // Raise an error that the symbol is already defined
        console.log(
          `The variable ${name} declared on line ${lineNumber} has already been declared.`
        );
        exit();
      }

      // Save the symbol
      this.classSymbols.set(name, new Symbol(name, type, kind, index));

      // Increase the tally by one
      this.tally[kind] += 1;
    } else if (kind == "argument" || kind == "local") {
      // Save the subroutine symbol
      this.subroutineSymbols.set(name, new Symbol(name, type, kind, index));

      // Increase the tally
      this.tally[kind] += 1;
    } else {
      // raise error for unrecognised kind
    }
  }

  startSubroutine() {
    this.subroutineSymbols = new Map();
    this.tally.local = 0;
    this.tally.argument = 0;
  }

  varCount(kind) {
    return this.tally[kind];
  }

  getSymbol(name) {
    // Try to get symbol from subroutine symbols
    let symbol = this.subroutineSymbols.get(name);
    if (symbol) return symbol;

    // Try to get symbol from class symbols
    symbol = this.classSymbols.get(name);
    if (symbol) return symbol;

    return undefined;
  }

  kindOf(name) {
    return this.getSymbol(name)?.kind;
  }

  typeOf(name) {
    return this.getSymbol(name)?.type;
  }

  indexOf(name) {
    return this.getSymbol(name)?.index;
  }
}
