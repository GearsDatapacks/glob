import { Statement } from "../parser/ast";

export type ValueType = 
  'null'
  | 'boolean'
  | 'number'
  | 'string'
  | 'array'
  | 'native_function'
  | 'function';

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

export interface StringValue extends RuntimeValue {
  type: 'string';
  value: string;
}

export function makeStringValue (s: string): StringValue {
  return { type: 'string', value: s };
}

export interface ArrayValue extends RuntimeValue {
  type: 'array';
  value: RuntimeValue[];
}

export function makeArrayValue (a: RuntimeValue[]): ArrayValue {
  return { type: 'array', value: a };
}

export type FunctionCall = () => RuntimeValue;

export interface NativeFunctionValue extends RuntimeValue {
  type: 'native_function';
  name: string;
  call: FunctionCall;
}

export function makeNativeFunction (name: string, call: FunctionCall): NativeFunctionValue {
  return {
    type: 'native_function',
    name,
    call,
  };
}

export interface FunctionValue extends RuntimeValue {
  type: 'function';
  name: string;
  body: Statement[];
}

export function makeFunctionValue (name: string, body: Statement[]): FunctionValue {
  return {
    type: 'function',
    name,
    body,
  }
}
