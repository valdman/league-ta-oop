// Class reducable
interface Reducable<T, Result = unknown> {
  reduce(
    callback: (acc: Result, value: T) => Result,
    initialValue: Result
  ): Result;
}

const myArray: Reducable<number> = [1,2,3];
