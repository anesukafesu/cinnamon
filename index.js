import { readFile, readdir } from "fs/promises";
import { argv } from "process";
import { join } from "path";
import { tokenise, compileClass, executeFunction } from "./helpers/index.js";
import { TokenStream } from "./classes/index.js";

async function main() {
  const projectPath = argv[2];
  const projectFiles = await readdir(projectPath);

  const sourceCode = await Promise.all(
    projectFiles.map(async (filePath) => [
      filePath,
      await readFile(join(projectPath, filePath), "utf-8"),
    ])
  );

  const vmCode = sourceCode.map(([filePath, classCode]) => {
    const tokens = tokenise(classCode);
    const tokenStream = new TokenStream(tokens, filePath);
    return compileClass(tokenStream);
  });

  const code = new Map();
  const heap = new Map();
  const availableAddresses = [...Array(65536)].map((_, i) => i);

  for (const classCode of vmCode) {
    for (const functionCode of classCode) {
      const [_, functionName, nLocals] = functionCode[0].split(" ");
      code.set(functionName, { nLocals, functionCode: functionCode.slice(1) });
    }
  }

  executeFunction(code, "Main.main", 0, heap, availableAddresses);
}

main();
