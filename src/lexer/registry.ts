import { TokenType } from "./types";

export const VALID_SYMBOL_CHARS = [
  '+', '-', '*', '/', '%'
];

export const SYMBOLS: Record<string, TokenType> = {
  '+': TokenType.BinaryOperator,
  '-': TokenType.BinaryOperator,
  '*': TokenType.BinaryOperator,
  '/': TokenType.BinaryOperator,
  '%': TokenType.BinaryOperator,
};

export const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};
