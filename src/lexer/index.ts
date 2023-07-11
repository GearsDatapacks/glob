import { ParseError, SyntaxError } from "../errors";
import { isAlphabetic, isAlphanumeric, isNumber, isSkippable } from "./predicates";
import { KEYWORDS, SYMBOLS, VALID_SYMBOL_CHARS } from "./registry";
import { Token, TokenType } from "./types";

function token (type: TokenType, value = ''): Token {
  return { type, value };
}

export default function tokenise (sourceCode: string): Token[] {
  const tokens: Token[] = [];
  let src = sourceCode;
  let index = -1;

  const shift = (n = 1) => {
    let result = '';
    
    for (let i = 0; i < n; i++) {
      if (!src[0]) {
        throw new ParseError('Expected more characters, got EndOfFile');
      }

      result += src[0];
      src = src.slice(1);
    }

    return result;
  }

  while (src.length > 0) {
    index++;

    if (VALID_SYMBOL_CHARS.has(src[0])) {
      let found = false;

      for (const [symbol, type] of SYMBOLS) {
        if (src.startsWith(symbol)) {
          tokens.push(token(type, shift(symbol.length)));
          found = true;
          break;
        }
      }

      if (found) {
        continue;
      }
    }

    if (src[0] === '=') {
      tokens.push(token(TokenType.Equals, shift()));
    }

    else if (isNumber(src[0])) {
      let number = '';

      while (isNumber(src[0])) {
        number += shift();
      }

      tokens.push(token(TokenType.Number, number));
    }

    else if (isAlphabetic(src[0])) {
      let identifier = '';

      while (isAlphanumeric(src[0])) {
        identifier += shift();
      }

      if (KEYWORDS.has(identifier)) {
        tokens.push(token(KEYWORDS.get(identifier) as TokenType, identifier));
      }

      else {
        tokens.push(token(TokenType.Identifier, identifier));
      }
    }

    else if (src[0] === '"') {
      let string = '';
      shift();

      while (src[0] !== '"') {
        if (!src[0]) {
          throw new SyntaxError('Expected closing quote after string, reached EndOfFile');
        }

        if (src[0] === '\\') {
          shift();
          string += shift();
        }
        else {
          string += shift();
        }
      }

      shift();

      tokens.push(token(TokenType.String, string));
    }

    else {
      if (isSkippable(src[0])) {
        shift();
        continue;
      }

      throw new SyntaxError(`Unexpected character "${src[0]}" at position ${index}`);
    }
  }

  tokens.push(token(TokenType.EOF, 'EndOfFile'));

  return tokens;
}
