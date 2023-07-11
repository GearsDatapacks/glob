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
