import { evaluate, setVariable } from ".";
import { FunctionDeclaration, IfStatement, Program, Statement } from "../parser/ast";
import { RuntimeValue, makeFunctionValue, makeNullValue } from "./types";
import { truthy } from "./utils";

export function evaluateCodeBlock (block: Statement[]): RuntimeValue {
  let lastEvaluated: RuntimeValue = makeNullValue();

  for (const statement of block) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}

export function evaluateProgram (program: Program): RuntimeValue {
  let lastEvaluated: RuntimeValue = makeNullValue();

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}

export function evaluateIfStatment (ifSstatement: IfStatement): RuntimeValue {
  if (!truthy(evaluate(ifSstatement.condition))) {
    return makeNullValue();
  }

  return evaluateCodeBlock(ifSstatement.body);
}

export function evaluateFunctionDeclaration (declaration: FunctionDeclaration): RuntimeValue {
  const fn = makeFunctionValue(declaration.name, declaration.body);

  return setVariable(declaration.name, fn);
}
