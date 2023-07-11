import { LanguageError, ParseError, SyntaxError } from "../errors";
import tokenise from "../lexer"
import { Token, TokenType } from "../lexer/types"
import { ArrayLiteral, AssignmentExpression, BinaryOperation, Expression, FunctionDeclaration, Identifier, IfStatement, MemberExpression, NumberLiteral, Program, Statement, StringLiteral } from "./ast";

export default class Parser {
  private tokens: Token[] = []

  private eof (): boolean {
    return this.tokens[0].type === TokenType.EOF;
  }

  private next (): Token {
    return this.tokens[0];
  }

  private consume (): Token {
    return this.tokens.shift() as Token;
  }

  private expect (type: TokenType, errFn: (token: string) => LanguageError): Token {
    const nextToken = this.consume();

    if (!nextToken || nextToken.type !== type) {
      throw errFn(nextToken.value);
    }

    return nextToken;
  }

  parse (sourceCode: string): Statement {
    this.tokens = tokenise(sourceCode);
    const program: Program = {
      type: 'Program',
      body: [],
    };

    while (!this.eof()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }

  private parseStatement (): Statement {
    switch (this.next().type) {
      case TokenType.If:
        return this.parseIfStatement();
      case TokenType.Function:
        return this.parseFunctionDeclaration();

      default:
        return this.parseExpression();
    }
  }

  private parseIfStatement (): Statement {
    this.consume();

    const condition = this.parseExpression();
    const body: Statement[] = [];
    while (this.next().type !== TokenType.End) {
      body.push(this.parseStatement());
    }
    this.consume();

    return {
      type: 'IfStatement',
      condition,
      body,
    } as IfStatement;
  }

  private parseFunctionDeclaration (): Statement {
    this.consume();

    const name = this.expect(
      TokenType.Identifier,
      token => new SyntaxError(`Expected identifier after function keyword, got ${token}`)
    ).value;

    const body: Statement[] = [];

    while (this.next().type !== TokenType.End) {
      body.push(this.parseStatement());
    }

    this.consume(); // Consume end keyword

    return {
      type: 'FunctionDeclaration',
      name,
      body,
    } as FunctionDeclaration;
  }

  private parseExpression (): Expression {
    return this.parseAssignmentExpression();
  }

  private parseAssignmentExpression (): Expression {
    const assignee = this.parseAdditiveExpression();

    if (this.next().type === TokenType.Equals) {
      this.consume();
      const value = this.parseAssignmentExpression();
      return {
        type: 'AssignmentExpression',
        assignee,
        value,
      } as AssignmentExpression;
    }

    return assignee;
  }

  private parseAdditiveExpression(): Expression {
    let left = this.parseMultiplicativeExpression();

    while (this.next().value === '+' || this.next().value === '-') {
      const operator = this.consume().value;
      const right = this.parseMultiplicativeExpression();
      left = {
        type: 'BinaryOperation',
        left,
        right,
        operator,
      } as BinaryOperation;
    }

    return left;
  }

  private parseMultiplicativeExpression(): Expression {
    let left = this.parseMemberExpression();

    while (this.next().value === '*' || this.next().value === '/' || this.next().value === '%') {
      const operator = this.consume().value;
      const right = this.parseMemberExpression();
      left = {
        type: 'BinaryOperation',
        left,
        right,
        operator,
      } as BinaryOperation;
    }

    return left;
  }

  private parseMemberExpression(): Expression {
    let object = this.parseLiteral();

    while (this.next().type === TokenType.LeftSquare) {
      this.consume();

      const property = this.parseExpression();

      this.expect(
        TokenType.RightSquare,
        token => new SyntaxError(`Expected closing bracket after member expression, got ${token}`)
      );

      object = {
        type: 'MemberExpression',
        object,
        property,
      } as MemberExpression;
    }

    return object;
  }

  // Orders of precedence
  
  // Assignment
  // Logical operators
  // Comparison
  // Addition/Subtraction
  // Multiplication/Division
  // Member access
  // Unary operation
  // Literal

  private parseArray (): Expression {
    this.consume();

    const elements: Expression[] = [];

    if (this.next().type === TokenType.RightSquare) {
      this.consume();

      return {
        type: 'Array',
        elements: [],
      } as ArrayLiteral;
    }

    elements.push(this.parseExpression());

    while (this.next().type === TokenType.Comma) {
      this.consume();
      elements.push(this.parseExpression());
    }

    this.expect(
      TokenType.RightSquare,
      token => new SyntaxError(`Expected closing bracket after array, got ${token}`)
    );

    return {
      type: 'Array',
      elements,
    } as ArrayLiteral;
  }

  private parseLiteral (): Expression {
    switch (this.next().type) {
      case TokenType.Number:
        return {
          type: 'Number',
          value: parseFloat(this.consume().value)
        } as NumberLiteral;
      
      case TokenType.String:
        return { type: 'String', value: this.consume().value } as StringLiteral;
      
      case TokenType.Identifier:
        return { type: 'Identifier', value: this.consume().value } as Identifier;
      
      case TokenType.LeftSquare:
        return this.parseArray();
      
      case TokenType.LeftParen:
        this.consume();
        const expression = this.parseExpression();
        this.expect(
          TokenType.RightParen,
          token => new ParseError(`Expected closing bracket after expression, got ${token}`)
        );
        return expression;
      
      default:
        throw new ParseError(`Unexpected token ${this.next().value}`);
    }
  }
}
