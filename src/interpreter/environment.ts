import { floor, print, random } from "./builtins";
import { FunctionCall, RuntimeValue, makeNativeFunction, makeNullValue } from "./types";

const variables = new Map<string, RuntimeValue>();

export function setVariable(name: string, value: RuntimeValue): RuntimeValue {
  variables.set(name, value);

  return value;
}

export function getVariable(name: string): RuntimeValue {
  return variables.get(name) || makeNullValue();
}

function defineNativeFunction (name: string, call: FunctionCall) {
  setVariable(name, makeNativeFunction(name, call));
}

export function setupEnvironment() {
  variables.clear();

  defineNativeFunction('print', print);
  defineNativeFunction('random', random);
  defineNativeFunction('floor', floor);
}
