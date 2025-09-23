import NativeLibrary from './NativeNativeLibrary';

export function multiply(a: number, b: number): number {
  return NativeLibrary.multiply(a, b);
}
