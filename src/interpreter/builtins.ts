import { getVariable, setVariable } from "./environment";
import { RuntimeValue, makeNullValue } from "./types";
import { stringify } from "./utils";

export function print (): RuntimeValue {
  const printValue = getVariable('print_input');
  setVariable('print_input', makeNullValue());

  let stringified = stringify(printValue);

  if (printValue.type === 'string') {
    stringified = stringified.slice(1, stringified.length - 1);
  }

  console.log(stringified);

  return makeNullValue();
}
