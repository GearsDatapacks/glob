export enum TokenType {
  EOF,

  // Literals
  Number,
  Identifier,

  // Keywords
  Let,

  // Symbols
  BinaryOperator, Equals,
  LeftParen, RightParen,
}

export interface Token {
  type: TokenType;
  value: string;
}
