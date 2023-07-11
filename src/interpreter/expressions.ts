import { evaluate, getVariable, setVariable } from ".";
import { RuntimeError, TypeError } from "../errors";
import { AssignmentExpression, BinaryOperation, Identifier, MemberExpression, UnaryOperation } from "../parser/ast";
import { evaluateCodeBlock } from "./statements";
import { ArrayValue, FunctionValue, NumberValue, RuntimeValue, makeBooleanValue, makeNumberValue } from "./types";
import { equal, truthy } from "./utils";

export function evaluateIdentifier (identifier: Identifier): RuntimeValue {
  const value = getVariable(identifier.value);

  if (value.type === 'function') {
    return evaluateCodeBlock((value as FunctionValue).body);
  }

  if (value.type === 'null') {
    if (!Number.isNaN(parseInt(identifier.value))) {
      return makeNumberValue(parseInt(identifier.value));
    }
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
    case '>':
      return makeBooleanValue(leftNum > rightNum);
    case '<':
      return makeBooleanValue(leftNum < rightNum);
    case '>=':
      return makeBooleanValue(leftNum >= rightNum);
    case '<=':
      return makeBooleanValue(leftNum <= rightNum);
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
    case '>':
    case '<':
    case '>=':
    case '<=':
      return evaluateNumericBinaryOperation(left, right, binOp.operator);
    
    case '==':
      return makeBooleanValue(equal(left, right));
    case '!=':
      return makeBooleanValue(!equal(left, right));

    default:
      throw new RuntimeError(`Invalid operator ${binOp.operator}`);
  }
}

export function evaluateUnaryOperation (unOp: UnaryOperation): RuntimeValue {
  const operand = evaluate(unOp.operand);
  switch (unOp.operator) {
    case '!':
      return makeBooleanValue(!truthy(operand));
    case '-':
      return makeNumberValue(-(operand as NumberValue).value);
    
    default:
      throw new RuntimeError(`Unrecognised unary operator "${unOp.operator}"`);
  }
}

export function evaluateAssignmentExpression (assignment: AssignmentExpression): RuntimeValue {
  if (assignment.assignee.type === 'Identifier') {
    const name = (assignment.assignee as Identifier).value;
    const value = evaluate(assignment.value);
  
    return setVariable(name, value);
  }

  else if (assignment.assignee.type === 'MemberExpression') {
    const memberExpression = assignment.assignee as MemberExpression;
    const object = evaluate(memberExpression.object);
    const property = evaluate(memberExpression.property);

    if (object.type !== 'array') {
      throw new TypeError(`Object of type ${object.type} is not indexable`);
    }
  
    if (property.type !== 'number') {
      throw new TypeError(`Array is not indexable with type ${property.type}`);
    }

    const value = evaluate(assignment.value);
    (object as ArrayValue).value[(property as NumberValue).value] = value;

    return value;
  }

  else {
    throw new TypeError(`Cannot assign to non-identifier value ${assignment.assignee.type}`);
  }
}

export function evaluateMemberExpression (memberExpression: MemberExpression): RuntimeValue {
  const object = evaluate(memberExpression.object);
  const property = evaluate(memberExpression.property);

  if (object.type !== 'array') {
    throw new TypeError(`Object of type ${object.type} is not indexable`);
  }

  if (property.type !== 'number') {
    throw new TypeError(`Array is not indexable with type ${property.type}`);
  }

  return (object as ArrayValue).value[(property as NumberValue).value];
}
