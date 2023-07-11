import { TypeError } from "../errors";
import { BooleanValue, NumberValue, RuntimeValue } from "./types";

export function truthy (value: RuntimeValue): boolean {
  switch (value.type) {
    case 'null':
      return false;
    case 'boolean':
      return (value as BooleanValue).value;
    case 'number':
      return (value as NumberValue).value !== 0;

    default:
      throw new TypeError(`Invalid value for truthiness check: ${JSON.stringify(value)}`);
  }
}
