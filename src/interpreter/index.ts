import { RuntimeError } from "../errors";
import { AppendExpression, ArrayLiteral, AssignmentExpression, BinaryOperation, FunctionDeclaration, Identifier, IfStatement, MemberExpression, Program, Statement, StringLiteral, UnaryOperation } from "../parser/ast";
import { evaluateAppendExpression, evaluateAssignmentExpression, evaluateBinaryOperation, evaluateIdentifier, evaluateMemberExpression, evaluateUnaryOperation } from "./expressions";
import { evaluateFunctionDeclaration, evaluateIfStatment, evaluateProgram } from "./statements";
import { RuntimeValue, makeArrayValue, makeBooleanValue, makeNullValue, makeNumberValue, makeStringValue } from "./types";
export function evaluate (astNode: Statement): RuntimeValue {
  try {
    switch (astNode.type) {
      case 'Program':
        return evaluateProgram(astNode as Program);
      case 'IfStatement':
        return evaluateIfStatment(astNode as IfStatement);
      case 'FunctionDeclaration':
        return evaluateFunctionDeclaration(astNode as FunctionDeclaration);
      
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
      case 'UnaryOperation':
        return evaluateUnaryOperation(astNode as UnaryOperation);
      case 'AssignmentExpression':
        return evaluateAssignmentExpression(astNode as AssignmentExpression);
      case 'MemberExpression':
        return evaluateMemberExpression(astNode as MemberExpression);
      case 'AppendExpression':
        return evaluateAppendExpression(astNode as AppendExpression);

      default:
        throw new RuntimeError(`Unrecognised AST node: ${JSON.stringify(astNode, null, 2)}`);
    }
  }
  catch (err) {
    if (err instanceof RuntimeError) {
      return makeNullValue();
    }

    throw err;
  }
}
