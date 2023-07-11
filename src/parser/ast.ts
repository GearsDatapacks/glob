export type NodeType = 
  // Statements
  'Program'
  | 'IfStatement'
  | 'FunctionDeclaration'

  // Expressions
  | 'AssignmentExpression'
  | 'AppendExpression'
  | 'BinaryOperation'
  | 'UnaryOperation'
  | 'MemberExpression'

  // Literals
  | 'Array'
  | 'String'
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

export interface UnaryOperation extends Expression {
  type: 'UnaryOperation';
  operator: string;
  operand: Expression;
}

export interface AssignmentExpression extends Expression {
  type: 'AssignmentExpression';
  assignee: Expression;
  value: Expression;
}

export interface AppendExpression extends Expression {
  type: 'AppendExpression';
  left: Expression;
  right: Expression;
}

export interface Identifier extends Expression {
  type: 'Identifier';
  value: string;
}

export interface StringLiteral extends Expression {
  type: 'String';
  value: string;
}

export interface ArrayLiteral extends Expression {
  type: 'Array';
  elements: Expression[];
}

export interface MemberExpression extends Expression {
  type: 'MemberExpression';
  object: Expression;
  property: Expression;
}
