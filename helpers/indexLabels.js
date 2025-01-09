export function indexLabels(functionCode) {
  const labels = new Map();

  // Build a map of labels and the instruction index they correspond to
  for (let i = 0; i < functionCode.length; i++) {
    const instruction = functionCode[i];
    const words = instruction.split(" ");

    if (words[0] == "label") {
      labels.set(words[1], i);
    }
  }

  return labels;
}
