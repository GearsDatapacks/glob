import { evaluate } from ".";
import { getVariable, setVariable } from "./environment";
import { RuntimeError, TypeError } from "../errors";
import { AppendExpression, AssignmentExpression, BinaryOperation, Identifier, MemberExpression, UnaryOperation } from "../parser/ast";
import { evaluateCodeBlock } from "./statements";
import { ArrayValue, FunctionValue, NativeFunctionValue, NumberValue, RuntimeValue, makeArrayValue, makeBooleanValue, makeNumberValue } from "./types";
import { equal, truthy } from "./utils";

export function evaluateIdentifier (identifier: Identifier): RuntimeValue {
  const value = getVariable(identifier.value);

  if (value.type === 'function') {
    return evaluateCodeBlock((value as FunctionValue).body);
  }
  else if (value.type === 'native_function') {
    return (value as NativeFunctionValue).call();
  }

  if (value.type === 'null') {
    if (!Number.isNaN(parseInt(identifier.value))) {
      return makeNumberValue(parseInt(identifier.value));
    }
  }

  return value;
}

function evaluateNumericBinaryOperation (left: RuntimeValue, right: RuntimeValue, op: string): RuntimeValue {
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

export function evaluateAppendExpression (appendExpression: AppendExpression): RuntimeValue {
  if (appendExpression.left.type === 'Identifier') {
    const name = (appendExpression.left as Identifier).value;
    const value = evaluate(appendExpression.right);

    const array = (getVariable(name) as ArrayValue).value;
    array.push(value);
  
    return setVariable(name, makeArrayValue(array));
  }

  else if (appendExpression.left.type === 'MemberExpression') {
    const memberExpression = appendExpression.left as MemberExpression;
    const object = evaluate(memberExpression.object);
    const property = evaluate(memberExpression.property);

    if (object.type !== 'array') {
      throw new TypeError(`Object of type ${object.type} is not indexable`);
    }
  
    if (property.type !== 'number') {
      throw new TypeError(`Array is not indexable with type ${property.type}`);
    }

    const value = evaluate(appendExpression.right);
    const memberValue = (object as ArrayValue).value[(property as NumberValue).value];

    (memberValue as ArrayValue).value.push(value);

    return memberValue;
  }

  else {
    throw new TypeError(`Cannot assign to non-identifier value ${appendExpression.left.type}`);
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
