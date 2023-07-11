export enum TokenType {
  EOF,

  // Literals
  String,
  Identifier,

  // Keywords
  Let,
  If,
  Function,
  End,

  // Symbols
  Operator, Equals,
  LeftParen, RightParen,
  LeftSquare, RightSquare,
  // LeftBrace, RightBrace,
  Comma,
}

export interface Token {
  type: TokenType;
  value: string;
}
