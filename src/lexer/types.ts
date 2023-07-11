export enum TokenType {
  EOF,

  // Literals
  Number,
  Identifier,

  // Keywords
  Let,
  If,
  Function,
  End,

  // Symbols
  BinaryOperator, Equals,
  LeftParen, RightParen,
  LeftSquare, RightSquare,
  LeftBrace, RightBrace,
  Comma,
}

export interface Token {
  type: TokenType;
  value: string;
}
