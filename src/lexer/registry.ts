import { TokenType } from "./types";

export const VALID_SYMBOL_CHARS = [
  '+', '-', '*', '/', '%',
  '(', ')', '{', '}', '[', ']',
   ',',
];

export const SYMBOLS: Record<string, TokenType> = {
  '+': TokenType.BinaryOperator,
  '-': TokenType.BinaryOperator,
  '*': TokenType.BinaryOperator,
  '/': TokenType.BinaryOperator,
  '%': TokenType.BinaryOperator,

  '(': TokenType.LeftParen,
  ')': TokenType.RightParen,
  '{': TokenType.LeftBrace,
  '}': TokenType.RightBrace,
  '[': TokenType.LeftSquare,
  ']': TokenType.RightSquare,

  ',': TokenType.Comma,
};

export const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
  if: TokenType.If,
  end: TokenType.End,
  function: TokenType.Function,
};
