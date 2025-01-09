// Start state handlers
import { dot as dot_in_start } from "./start/dot.js";
import { digit as digit_in_start } from "./start/digit.js";
import { double_quote as double_quote_in_start } from "./start/double_quote.js";
import { forward_slash as forward_slash_in_start } from "./start/forward_slash.js";
import { newline as newline_in_start } from "./start/newline.js";
import { other as other_in_start } from "./start/other.js";
import { single_quote as single_quote_in_start } from "./start/single_quote";
import { symbol_asterisk_or_backslash as symbol_asterisk_or_backslash_in_start } from "./start/symbol_asterisk_or_backslash.js";
import { underscore_or_letter as underscore_or_letter_in_letter } from "./start/underscore_or_letter";
import { whitespace as whitespace_in_start } from "./start/whitespace.js";

// Character Literal State handlers
import { catch_all as catch_all_in_character_literal } from "./character_literal/catch_all.js";
import { newline as newline_in_character_literal } from "./character_literal/newline.js";
import { single_quote as single_quote_in_character_literal } from "./character_literal/single_quote.js";

export const characterHandler = {
  start: {
    asterisk: symbol_asterisk_or_backslash_in_start,
    back_slash: symbol_asterisk_or_backslash_in_start,
    dot: dot_in_start,
    digit: digit_in_start,
    double_quote: double_quote_in_start,
    forward_slash: forward_slash_in_start,
    letter: underscore_or_letter_in_letter,
    newline: newline_in_start,
    other: other_in_start,
    single_quote: single_quote_in_start,
    symbol: symbol_asterisk_or_backslash_in_start,
    underscore: underscore_or_letter_in_letter,
    whitespace: whitespace_in_start,
  },

  character_literal: {
    catch_all: catch_all_in_character_literal,
    newline: newline_in_character_literal,
    single_quote: single_quote_in_character_literal,
  },
};
