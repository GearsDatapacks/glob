import { evaluate } from ".";
import { IfStatement, Program } from "../parser/ast";
import { RuntimeValue, makeNullValue } from "./types";
import { truthy } from "./utils";

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

  let lastEvaluated: RuntimeValue = makeNullValue();
  for (const statement of ifSstatement.body) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}
