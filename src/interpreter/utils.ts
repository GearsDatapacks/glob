import { TypeError } from "../errors";
import { ArrayValue, BooleanValue, NumberValue, RuntimeValue, StringValue } from "./types";

export function truthy (value: RuntimeValue): boolean {
  switch (value.type) {
    case 'null':
      return false;
    case 'boolean':
      return (value as BooleanValue).value;
    case 'number':
      return (value as NumberValue).value !== 0;
    case 'string':
      return (value as StringValue).value.length !== 0;
    case 'array':
      return (value as ArrayValue).value.length !== 0;
    case 'function':
    case 'native_function':
      return true;

    default:
      throw new TypeError(`Invalid value for truthiness check: ${JSON.stringify(value)}`);
  }
}

export function equal (left: RuntimeValue, right: RuntimeValue): boolean {
  if (left.type !== right.type) {
    return false;
  }

  switch (left.type) {
    case 'null':
      return true;
    case 'boolean':
      return (left as BooleanValue).value === (right as BooleanValue).value;
    case 'number':
      return (left as NumberValue).value === (right as NumberValue).value;
    case 'string':
      return (left as StringValue).value === (right as StringValue).value;
    case 'array':
      const leftArray = (left as ArrayValue).value;
      const rightArray = (right as ArrayValue).value;

      if (leftArray.length !== rightArray.length) {
        return false;
      }

      for (let i = 0; i < leftArray.length; i++) {
        if (!equal(leftArray[i], rightArray[i])) {
          return false;
        }
      }
      return true;

    default:
      throw new TypeError(`Invalid type for equality check: ${JSON.stringify(left.type)}`);
  }
}
