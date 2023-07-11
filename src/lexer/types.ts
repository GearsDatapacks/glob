export enum TokenType {
  EOF,

  // Literals
  Number,
  Identifier,

  // Keywords
  Let,
  If,
  End,

  // Symbols
  BinaryOperator, Equals,
  LeftParen, RightParen,
}

export interface Token {
  type: TokenType;
  value: string;
}
