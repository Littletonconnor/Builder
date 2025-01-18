import { deepMerge } from "../utils";

describe("#deepMerge", () => {
  test("merges shallow objects", () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };

    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 });
  });

  test("merges nested objects", () => {
    const target = { a: { x: 1 }, b: 2 };
    const source = { a: { y: 1 }, c: 2 };

    expect(deepMerge(target, source)).toEqual({
      a: { x: 1, y: 1 },
      b: 2,
      c: 2,
    });
  });

  test("handles arrays by replacing them", () => {
    const target = { a: [1, 2] };
    const source = { a: [2, 3] };

    expect(deepMerge(target, source)).toEqual({
      a: [2, 3],
    });
  });

  test("handles undefined values in source", () => {
    const target = { a: 1, b: 2 };
    const source = { b: undefined };

    expect(deepMerge(target, source)).toEqual({
      a: 1,
      b: undefined,
    });
  });

  test("does not mutate the target our source objets", () => {
    const target = { a: { x: 1 } };
    const source = { a: { y: 2 } };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: { x: 1, y: 2 } });
    expect(target).toEqual({ a: { x: 1 } });
    expect(source).toEqual({ a: { y: 2 } });
  });

  test("resturns the source if target is not an object", () => {
    expect(deepMerge(null, { a: 1 })).toEqual({ a: 1 });
  });
});
