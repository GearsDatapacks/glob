import { getVariable, setVariable } from "./environment";
import { NumberValue, RuntimeValue, makeNullValue, makeNumberValue, makeStringValue } from "./types";
import { stringify } from "./utils";

function printFormat (value: RuntimeValue): string {
  const stringified = stringify(value);

  if (value.type === 'string') {
    return stringified.slice(1, stringified.length - 1);
  }

  return stringified;
}

export function print (): RuntimeValue {
  const printValue = getVariable('print_input');
  setVariable('print_input', makeNullValue());

  console.log(printFormat(printValue));

  return makeNullValue();
}

export function random (): RuntimeValue {
  return makeNumberValue(Math.random());
}
