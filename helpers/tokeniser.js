function symbolInStart(character, nextCharacter) {
  // Returns nothing
  // Side effect of modifying currentToken, tokens and currentState
}

const characterHandler = {
  start: {
    asterisk: symbolInStart,
    backslash: symbolInStart,
  },
};

const context = {
  character,
  nextCharacter,
  currentToken,
  tokens,
  currentState,
};

characterHandler[state][characterType](context);
