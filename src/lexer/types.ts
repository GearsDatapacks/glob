export enum TokenType {
  EOF,

  // Literals
  Number,
  Identifier,

  // Keywords
  Let,
  If,

  // Symbols
  BinaryOperator, Equals,
  LeftParen, RightParen,
}

export interface Token {
  type: TokenType;
  value: string;
}
