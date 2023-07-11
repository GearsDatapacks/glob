import { evaluate, getVariable, setVariable } from ".";
import { RuntimeError, TypeError } from "../errors";
import { AssignmentExpression, BinaryOperation, Identifier } from "../parser/ast";
import { evaluateCodeBlock } from "./statements";
import { FunctionValue, NumberValue, RuntimeValue, makeNullValue, makeNumberValue } from "./types";

export function evaluateIdentifier (identifier: Identifier): RuntimeValue {
  const value = getVariable(identifier.value);

  if (value.type === 'function') {
    return evaluateCodeBlock((value as FunctionValue).body);
  }

  return value;
}

function evaluateNumericBinaryOperation (left: RuntimeValue, right: RuntimeValue, op: string): RuntimeValue {
  if (left.type !== 'number' || right.type !== 'number') {
    throw new TypeError(`Operator '${op}' cannot be applied to type ${left.type} and ${right.type}`);
  }

  const leftNum = (left as NumberValue).value;
  const rightNum = (right as NumberValue).value;

  let result = 0;

  switch (op) {
    case '+':
      result = leftNum + rightNum;
      break;
    case '-':
      result = leftNum - rightNum;
      break;
    case '*':
      result = leftNum * rightNum;
      break;
    case '/':
      result = leftNum / rightNum;
      break;
    case '%':
      result = leftNum % rightNum;
      break;
    default:
      throw new RuntimeError(`Invalid numeric operator ${op}`);
  }

  return makeNumberValue(result);
}

export function evaluateBinaryOperation (binOp: BinaryOperation): RuntimeValue {
  const left = evaluate(binOp.left);
  const right = evaluate(binOp.right);

  switch (binOp.operator) {
    case '+':
      if (left.type !== right.type) {
        throw new TypeError(`Type ${left.type} cannot be added to type ${right.type}`);
      }

      if (left.type === 'number') {
        return evaluateNumericBinaryOperation(left, right, binOp.operator);
      }
      throw new TypeError(`Operator '+' cannot be applied to type ${left.type}`);

    case '-':
    case '*':
    case '/':
    case '%':
      return evaluateNumericBinaryOperation(left, right, binOp.operator);
    
    default:
      throw new RuntimeError(`Invalid operator ${binOp.operator}`);
  }
}

export function evaluateAssignmentExpression (assignment: AssignmentExpression): RuntimeValue {
  if (assignment.assignee.type !== 'Identifier') {
    throw new TypeError(`Cannot assign to non-identifier value ${assignment.assignee.type}`);
  }

  const name = (assignment.assignee as Identifier).value;
  const value = evaluate(assignment.value);

  return setVariable(name, value);
}
