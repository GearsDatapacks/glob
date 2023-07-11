import { RuntimeError } from "../errors";
import { AssignmentExpression, BinaryOperation, Identifier, IfStatement, NumberLiteral, Program, Statement } from "../parser/ast";
import { evaluateAssignmentExpression, evaluateBinaryOperation, evaluateIdentifier } from "./expressions";
import { evaluateIfStatment, evaluateProgram } from "./statements";
import { RuntimeValue, makeNullValue, makeNumberValue } from "./types";

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
    
    case 'Number':
      return makeNumberValue((astNode as NumberLiteral).value);
    case 'Identifier':
      return evaluateIdentifier(astNode as Identifier);
    
    case 'BinaryOperation':
      return evaluateBinaryOperation(astNode as BinaryOperation);
    case 'AssignmentExpression':
      return evaluateAssignmentExpression(astNode as AssignmentExpression);

    default:
      throw new RuntimeError(`Unrecognised AST node: ${JSON.stringify(astNode, null, 2)}`);
  }
}
