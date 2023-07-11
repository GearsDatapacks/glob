export type ValueType = 
  'null'
  | 'boolean'
  | 'number';

export interface RuntimeValue {
  type: ValueType;
}

export interface NullValue extends RuntimeValue {
  type: 'null';
  value: null;
}

export function makeNullValue (): NullValue {
  return { type: 'null', value: null };
}

export interface BooleanValue extends RuntimeValue {
  type: 'boolean';
  value: boolean;
}

export function makeBooleanValue (b: boolean): BooleanValue {
  return { type: 'boolean', value: b };
}

export interface NumberValue extends RuntimeValue {
  type: 'number';
  value: number;
}

export function makeNumberValue (n: number): NumberValue {
  return { type: 'number', value: n };
}
