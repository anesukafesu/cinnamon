export function escape(char) {
  switch (char) {
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case "&":
      return "&amp;";
    case '"':
      return "&quot;";
    default:
      return char;
  }
}
