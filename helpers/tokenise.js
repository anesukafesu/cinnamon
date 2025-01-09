import { getCharacterType, isKeyword } from "./utils/index.js";
import { unexpectedCharacter } from "./errors/index.js";
import { Token } from "../classes/index.js";

export function tokenise(code) {
  // Standardise all newline characters
  code = code.replace(/\r\n/g, "\n");
  let lineCount = 1;
  let state = "start";
  let tokens = [];
  let currentToken = "";

  for (let i = 0; i < code.length; i++) {
    const character = code[i];
    const characterType = getCharacterType(character);

    switch (state) {
      case "start": {
        switch (characterType) {
          case "asterisk":
          case "symbol": {
            // Remain in start state but add character as symbol token
            const token = new Token(character, "symbol", lineCount);
            tokens.push(token);
            continue;
          }

          case "forward_slash": {
            // check the next character to see if it a comment
            const nextCharacter = i < code.length - 1 ? code[i + 1] : undefined;

            // If the next character is a /, we enter inline comment state
            if (nextCharacter == "/") {
              state = "inline_comment";
              continue;
            }

            // If the next character is a *, we enter multiline comment state
            if (nextCharacter == "*") {
              state = "multiline_comment";
              continue;
            }

            // It is just a normal forward slash so we treat it as a symbol
            const token = new Token(character, "symbol", lineCount);
            tokens.push(token);
            continue;
          }

          case "digit": {
            // Add character to current token and move to integer literal state
            currentToken += character;
            state = "integer_literal";
            continue;
          }

          case "newline": {
            lineCount++;
            continue;
          }

          case "whitespace": {
            // Do nothing and continue to next character
            continue;
          }

          case "underscore":
          case "letter": {
            // Add character to current token and move to keyword or identifier state
            currentToken += character;
            state = "keyword_or_identifier";
            continue;
          }

          case "quote": {
            // Change state to string literal state
            state = "string_literal";
            continue;
          }

          case "other": {
            unexpectedCharacter(lineCount, character);
          }
        }
      }

      case "integer_literal": {
        switch (characterType) {
          case "asterisk":
          case "symbol": {
            // The current token (a number) has been terminated by the current character (symbol)
            // Add current token as a number token to the list of tokens
            const numberToken = new Token(
              currentToken,
              "integer_literal",
              lineCount
            );
            currentToken = "";
            tokens.push(numberToken);

            // Add current character as a symbol token to the list of tokens.
            const symbolToken = new Token(character, "symbol", lineCount);
            tokens.push(symbolToken);

            // Move to the start state
            state = "start";
            continue;
          }

          case "forward_slash": {
            // check the next character to see if it a comment
            const nextCharacter = i < code.length - 1 ? code[i + 1] : undefined;

            // If the next character is a /, we enter inline comment state
            if (nextCharacter == "/") {
              // Save current token as a token
              const numberToken = new Token(
                currentToken,
                "integer_literal",
                lineCount
              );
              currentToken = "";
              tokens.push(numberToken);

              state = "inline_comment";
              continue;
            }

            // If the next character is a *, we enter multiline comment state
            if (nextCharacter == "*") {
              // Save the current token as a token
              const numberToken = new Token(
                currentToken,
                "integer_literal",
                lineCount
              );
              currentToken = "";
              tokens.push(numberToken);

              state = "multiline_comment";
              continue;
            }
            // It is just a normal forward slash so we treat it as a symbol
            // The current token (a number) has been terminated by the current character (symbol)
            // Add current token as a number token to the list of tokens
            const numberToken = new Token(
              currentToken,
              "integer_literal",
              lineCount
            );
            currentToken = "";
            tokens.push(numberToken);

            // Add current character as a symbol token to the list of tokens.
            const symbolToken = new Token(
              character,
              "integer_literal",
              lineCount
            );
            tokens.push(symbolToken);

            // Move to the start state
            state = "start";
            continue;
          }

          case "digit": {
            // Add the digit the current token as it is part of a larger number
            currentToken += character;
            continue;
          }

          case "newline": {
            lineCount++;
            continue;
          }

          case "whitespace": {
            // The current token (number) has been terminated by the white space
            // Add current token as a number to the list of tokens
            const numberToken = new Token(
              currentToken,
              "integer_literal",
              lineCount
            );
            currentToken = "";
            tokens.push(numberToken);
            state = "start";
            continue;
          }

          case "quote":
          case "underscore":
          case "letter":
          case "other": {
            throw unexpectedCharacter(lineCount, character);
          }
        }
      }

      case "keyword_or_identifier": {
        switch (characterType) {
          case "asterisk":
          case "symbol": {
            // The symbol terminated the keyword or identifier
            // Therefore, we add currentToken as either a keyword or identifier
            const keywordOrSymbolToken = new Token(
              currentToken,
              isKeyword(currentToken) ? "keyword" : "identifier",
              lineCount
            );
            currentToken = "";
            tokens.push(keywordOrSymbolToken);

            // We also add the current character as a symbol token
            const symbolToken = new Token(character, "symbol", lineCount);
            tokens.push(symbolToken);

            state = "start";
            continue;
          }

          case "forward_slash": {
            // check the next character to see if it a comment
            const nextCharacter = i < code.length - 1 ? code[i + 1] : undefined;

            // If the next character is a /, we enter inline comment state
            if (nextCharacter == "/") {
              // Save current token as a token
              const token = new Token(
                currentToken,
                isKeyword(currentToken) ? "keyword" : "integer_constant",
                lineCount
              );
              currentToken = "";
              tokens.push(token);

              state = "inline_comment";
              continue;
            }

            // If the next character is a *, we enter multiline comment state
            if (nextCharacter == "*") {
              // Save current token as a token
              const token = new Token(
                currentToken,
                isKeyword(currentToken) ? "keyword" : "identifier",
                lineCount
              );
              currentToken = "";
              tokens.push(token);

              // Enter the multi-line comment state
              state = "multline_comment";
              continue;
            }
            // It is just a normal forward slash so we treat it as a symbol
            // The current token (a number) has been terminated by the current character (symbol)
            // Add current token as a number token to the list of tokens
            // Save current token as a token
            const token = new Token(
              currentToken,
              isKeyword(currentToken) ? "keyword" : "identifier",
              lineCount
            );
            currentToken = "";
            tokens.push(token);

            // Add current character as a symbol token to the list of tokens.
            const symbolToken = new Token(character, "symbol", lineCount);
            tokens.push(symbolToken);

            // Move to the start state
            state = "start";
            continue;
          }

          case "newline": {
            const keywordOrSymbolToken = new Token(
              currentToken,
              isKeyword(currentToken) ? "keyword" : "identifier",
              lineCount
            );

            currentToken = "";

            tokens.push(keywordOrSymbolToken);
            state = "start";
            lineCount++;
            continue;
          }

          case "whitespace": {
            // The whitespace terminated the keyword or identifier
            // Therefore, we add currentToken as either a keyword or identifier
            const keywordOrSymbolToken = new Token(
              currentToken,
              isKeyword(currentToken) ? "keyword" : "identifier",
              lineCount
            );
            currentToken = "";
            tokens.push(keywordOrSymbolToken);

            state = "start";
            continue;
          }

          case "letter":
          case "digit":
          case "underscore": {
            // Add the character to the currentToken
            currentToken += character;
            continue;
          }

          case "quote":
          case "other": {
            unexpectedCharacter(lineCount, character);
          }
        }
      }

      case "string_literal": {
        switch (characterType) {
          case "quote": {
            // The string has been terminated
            // Then we add current token to list of tokens
            const token = new Token(currentToken, "string_literal", lineCount);
            currentToken = "";
            tokens.push(token);
            state = "start";
            continue;
          }

          default: {
            // If it is anything else, then the character is part of the string literal
            // So we add it to currentToken and continue
            currentToken += character;
            continue;
          }
        }
      }

      case "inline_comment": {
        switch (characterType) {
          case "newline": {
            lineCount++;
            state = "start";
            continue;
          }
          default: {
            continue;
          }
        }
      }

      case "multiline_comment": {
        switch (characterType) {
          case "newline": {
            lineCount++;
            continue;
          }

          case "asterisk": {
            const nextCharacter = i < code.length - 1 ? code[i + 1] : undefined;

            if (nextCharacter == "/") {
              state = "start";
              // We skip over the next character, which is a forward slash, as it is
              // part of the comment.
              i++;
              continue;
            }

            // If it's not part of the comment-terminating sequence, we ignore it
            continue;
          }

          default: {
            continue;
          }
        }
      }
    }
  }

  // Handle anything that remains in currentToken
  if (currentToken != "") {
    switch (state) {
      case "string_literal": {
        // A string was started but not terminated by the end of the file
        throw Error("Unterminated string literal");
      }

      case "integer_literal": {
        // We treat this as the end of the integer constant
        const token = new Token(currentToken, "integer_literal", lineCount);
        currentToken = "";
        tokens.push(token);
        break;
      }

      case "keyword_or_identifier": {
        // We treat this as the end of the keyword or identifier
        const token = new Token(
          currentToken,
          isKeyword(currentToken) ? "keyword" : "identifier",
          lineCount
        );

        tokens.push(token);
        break;
      }
    }
  }

  return tokens;
}
