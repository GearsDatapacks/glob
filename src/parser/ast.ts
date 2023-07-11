export type NodeType = 
  // Statements
  'Program'
  | 'IfStatement'
  | 'FunctionDeclaration'

  // Expressions
  | 'AssignmentExpression'
  | 'BinaryOperation'
  | 'FunctionCall'

  // Literals
  | 'Number'
  | 'Identifier';

export interface Statement {
  type: NodeType;
}

export interface Program extends Statement {
  type: 'Program';
  body: Statement[];
}

export interface IfStatement extends Statement {
  type: 'IfStatement';
  condition: Expression;
  body: Statement[];
}

export interface FunctionDeclaration extends Statement {
  type: 'FunctionDeclaration';
  name: string;
  body: Statement[];
}

export interface Expression extends Statement {}

export interface BinaryOperation extends Expression {
  type: 'BinaryOperation';
  left: Expression;
  right: Expression;
  operator: string;
}

export interface AssignmentExpression extends Expression {
  type: 'AssignmentExpression';
  assignee: Expression;
  value: Expression;
}

export interface NumberLiteral extends Expression {
  type: 'Number';
  value: number;
}

export interface Identifier extends Expression {
  type: 'Identifier';
  value: string;
}
