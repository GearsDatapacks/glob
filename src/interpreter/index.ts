import { RuntimeError } from "../errors";
import { ArrayLiteral, AssignmentExpression, BinaryOperation, FunctionDeclaration, Identifier, IfStatement, MemberExpression, NumberLiteral, Program, Statement, StringLiteral } from "../parser/ast";
import { evaluateAssignmentExpression, evaluateBinaryOperation, evaluateIdentifier, evaluateMemberExpression } from "./expressions";
import { evaluateFunctionDeclaration, evaluateIfStatment, evaluateProgram } from "./statements";
import { RuntimeValue, makeArrayValue, makeNullValue, makeNumberValue, makeStringValue } from "./types";

const variables = new Map<string, RuntimeValue>();

export function setVariable (name: string, value: RuntimeValue): RuntimeValue {
  variables.set(name, value);

  return value;
}

export function getVariable (name: string): RuntimeValue {
  return variables.get(name) || makeNullValue();
}

export function evaluate (astNode: Statement): RuntimeValue {
  switch (astNode.type) {
    case 'Program':
      return evaluateProgram(astNode as Program);
    case 'IfStatement':
      return evaluateIfStatment(astNode as IfStatement);
    case 'FunctionDeclaration':
      return evaluateFunctionDeclaration(astNode as FunctionDeclaration);
    
    case 'Number':
      return makeNumberValue((astNode as NumberLiteral).value);
    case 'String':
      return makeStringValue((astNode as StringLiteral).value);
    case 'Array':
      return makeArrayValue(
        (astNode as ArrayLiteral).elements
        .map(elem => evaluate(elem))
      );
    case 'Identifier':
      return evaluateIdentifier(astNode as Identifier);
    
    case 'BinaryOperation':
      return evaluateBinaryOperation(astNode as BinaryOperation);
    case 'AssignmentExpression':
      return evaluateAssignmentExpression(astNode as AssignmentExpression);
    case 'MemberExpression':
      return evaluateMemberExpression(astNode as MemberExpression);

    default:
      throw new RuntimeError(`Unrecognised AST node: ${JSON.stringify(astNode, null, 2)}`);
  }
}
