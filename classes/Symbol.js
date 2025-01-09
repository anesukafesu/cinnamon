export class Symbol {
  constructor(name, type, kind, index) {
    this.name = name;
    this.kind = kind;
    this.type = type;
    this.index = index;
  }

  get representation() {
    return `${this.kind == "field" ? "this" : this.kind} ${this.index}`;
  }
}
