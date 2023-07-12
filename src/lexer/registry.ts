import { TokenType } from "./types";

export const VALID_SYMBOL_CHARS = new Set<string>([
  '+', '-', '*', '/', '%',
  '=', '<', '>',
  '!',
  '(', ')',
  '[', ']',
   ',',
]);

export const SYMBOLS: Map<string, TokenType> = new Map([
  ['+', TokenType.Operator],
  ['-', TokenType.Operator],
  ['*', TokenType.Operator],
  ['/', TokenType.Operator],
  ['%', TokenType.Operator],
  
  ['<<', TokenType.Operator],
  ['==', TokenType.Operator],
  ['!=', TokenType.Operator],
  ['>=', TokenType.Operator],
  ['<=', TokenType.Operator],
  ['>', TokenType.Operator],
  ['<', TokenType.Operator],
  
  ['=', TokenType.Operator],
  ['!', TokenType.Operator],

  ['(', TokenType.LeftParen],
  [')', TokenType.RightParen],
  ['[', TokenType.LeftSquare],
  [']', TokenType.RightSquare],

  [',', TokenType.Comma],
]);

export const UNARY_OPERATORS = new Set<string>([
  '-', '!'
]);

export const KEYWORDS: Map<string, TokenType> = new Map([
  ['let', TokenType.Let],
  ['if', TokenType.If],
  ['end', TokenType.End],
  ['function', TokenType.Function],
]);
