import { evaluate } from ".";
import { Program } from "../parser/ast";
import { RuntimeValue, makeNullValue } from "./types";

export function evaluateProgram (program: Program): RuntimeValue {
  let lastEvaluated: RuntimeValue = makeNullValue();

  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}
