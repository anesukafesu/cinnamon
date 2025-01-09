import { indexLabels } from "./index.js";

/**
 * The VM code to execute
 * @param {Map<string, {functionCode: string[], nLocals: Number}>} code The VM code to execute
 * @param {string} functionName The function to execute
 * @param {Number[]} args The arguments to the function
 * @param {Number} nLocals The number of local variables the function has
 * @param {Map<Number, Number[]>} heap The heap portion of the programs memory
 * @param {Number[]} availableAddresses The list of addresses available on the heap
 */

export function executeFunction(
  code,
  functionName,
  args,
  heap,
  availableAddresses
) {
  switch (functionName) {
    case "Memory.alloc": {
      const address = availableAddresses.pop();
      const size = args[0];
      heap.set(address, new Array(size).fill(0));
      return address;
    }

    case "Memory.dealloc": {
      const address = args[0];
      availableAddresses.push(address);
      return 0;
    }

    case "Output.print_str": {
      const stringAddress = args[0];
      const stringToOutput = heap
        .get(stringAddress)
        .map((int) => String.fromCharCode(int))
        .join("");
      console.log(stringToOutput);
      return 0;
    }

    case "Output.print_char": {
      const charCode = args[0];
      const char = String.fromCharCode(charCode);
      console.log(char);
      return 0;
    }

    case "Output.print_int": {
      const int = args[0];
      console.log(int);
      return 0;
    }

    case "Input.read_line": {
      // TODO: Figure out how to receive input
      const input = "";

      // TODO: Figure out how to generate a new address on the heap
      const address = "";

      // Store the value on the heap as a string
      heap.set(
        address,
        input.split("").map((char) => char.charCodeAt(0))
      );

      // Return the address
      return address;
    }

    case "String.new": {
      const address = availableAddresses.pop();
      heap.set(address, []);
      return address;
    }

    case "String.append_char": {
      const address = args[0];
      const char = args[1];
      heap.get(address).push(char);
      return address;
    }

    case "String.length": {
      const [address] = args;
      return heap.get(address).length;
    }

    case "String.concat": {
      // Map each address into a copy of the array at said address
      const concatenatedArray = [].concat(
        ...args.map((stringAddress) => heap.get(stringAddress))
      );
      const address = availableAddresses.pop();
      heap.set(address, concatenatedArray);
      return address;
    }

    case "Array.new": {
      const address = availableAddresses.pop();
      heap.set(address, []);
      console.log(heap);
      return address;
    }

    case "Array.append": {
      const [address, element] = args;
      heap.get(address).push(element);
      console.log(heap);
      return address;
    }

    case "Array.at": {
      const [address, index] = args;
      return heap.get(address)[index];
    }

    case "Array.length": {
      const [arrayAddress] = args;
      return heap.get(arrayAddress).length;
    }

    case "Array.dispose": {
      const [arrayAddress] = args;
      heap.delete(arrayAddress);
      console.log(heap);
      return 0;
    }

    default: {
      // Extract the function details
      const { functionCode, nLocals } = code.get(functionName);

      // Create an index of labels
      const labels = indexLabels(functionCode);

      // Create the locals and temp memory segments
      const locals = new Array(nLocals).fill(0);
      const temp = new Array(8).fill(0);

      // Create pointers to this and that
      let thisPointer = 0;
      let thatPointer = 0;

      // Create the stack
      const stack = [];

      // Execute the instructions
      for (let i = 0; i < functionCode.length; i++) {
        // Fetch and decode the instruction
        const instruction = functionCode[i];
        const words = instruction.split(" ");
        const action = words[0];

        switch (action) {
          case "push": {
            // push <segment> <index>
            const segment = words[1];
            const index = words[2];

            switch (segment) {
              case "argument": {
                stack.push(args[index]);
                break;
              }

              case "local": {
                stack.push(locals[index]);
                break;
              }

              case "pointer": {
                if (index == 0) {
                  stack.push(thisPointer);
                } else if (index == 1) {
                  stack.push(thatPointer);
                }
                break;
              }

              case "this": {
                stack.push(heap.get(thisPointer)[index]);
                break;
              }

              case "that": {
                stack.push(heap.get(thatPointer)[index]);
                break;
              }

              case "temp": {
                stack.push(temp[index]);
                break;
              }

              case "constant": {
                stack.push(Number(index));
                break;
              }
            }

            break;
          }

          case "pop": {
            // pop <segment> <index>
            const segment = words[1];
            const index = words[2];

            switch (segment) {
              case "argument": {
                args[index] = stack.pop();
                break;
              }

              case "local": {
                locals[index] = stack.pop();
                break;
              }

              case "pointer": {
                if (index == 0) {
                  thisPointer = stack.pop();
                } else if (index == 1) {
                  thatPointer = stack.pop();
                }
                break;
              }

              case "this": {
                heap.get(thisPointer)[index] = stack.pop();
                break;
              }

              case "that": {
                heap.get(thatPointer)[index] = stack.pop();
                break;
              }

              case "temp": {
                temp[index] = stack.pop();
                break;
              }
            }

            break;
          }

          case "add": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a + b);
            break;
          }

          case "sub": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a - b);
            break;
          }

          case "mul": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a * b);
            break;
          }

          case "div": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(Math.round(a / b));
            break;
          }

          case "pow": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(Math.round(a ** b));
            break;
          }

          case "mod": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(Math.round(a % b));
            break;
          }

          case "neg": {
            const x = stack.pop();
            stack.push(-x);
            break;
          }

          case "and": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a && b ? -1 : 0);
            break;
          }

          case "or": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a || b ? -1 : 0);
            break;
          }

          case "not": {
            const x = stack.pop();

            stack.push(x == 0 ? -1 : 0);
            break;
          }

          case "lt": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a < b ? -1 : 0);
            break;
          }

          case "gt": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a > b ? -1 : 0);
            break;
          }

          case "eq": {
            const b = stack.pop();
            const a = stack.pop();

            stack.push(a == b ? -1 : 0);
            break;
          }

          case "goto": {
            const label = words[1];
            const instructionNumber = labels.get(label);
            i = instructionNumber;
            break;
          }

          case "if-goto": {
            const condition = stack.pop();
            const label = words[1];
            const instructionNumber = labels.get(label);
            if (condition) {
              i = instructionNumber;
            }
            break;
          }

          case "call": {
            const functionName = words[1];
            const nArgs = words[2];
            const functionArgs = stack.splice(-nArgs);

            const result = executeFunction(
              code,
              functionName,
              functionArgs,
              heap,
              availableAddresses
            );
            stack.push(result);
            break;
          }

          case "return": {
            return stack.pop();
          }
        }
      }
    }
  }
}
