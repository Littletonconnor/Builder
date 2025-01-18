/**
 * Creates a deep clone of the provided data, ensuring no references are shared
 * between the original object and the cloned object.
 *
 * @template T - The type of the data being cloned.
 * @param data - The data object to be cloned.
 * @returns A deep clone of the provided data.
 *
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = deepClone(original);
 *
 * Modifying the clone does not affect the original
 * cloned.b.c = 3;
 * console.log(original.b.c); // Output: 2
 * console.log(cloned.b.c); // Output: 3
 */
function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Deeply merges two objects, combining properties from the source into the target.
 * Nested objects are merged recursively, while non-object values are overwritten.
 *
 * @template T - The type of the target object.
 * @param target - The target object to be merged into.
 * @param source - The source object providing additional properties.
 * @returns A new object with the merged properties.
 *
 * @example
 * const target = { a: { x: 1 }, b: 2 };
 * const source = { a: { y: 2 }, c: 3 };
 * const result = deepMerge(target, source);
 * console.log(result);
 *
 * Output: { a: { x: 1, y: 2 }, b: 2, c: 3 }
 */
function deepMerge<T, V>(target: T, source: V): T & V {
  if (
    !target ||
    !source ||
    typeof target !== "object" ||
    typeof source !== "object"
  ) {
    return source as T & V;
  }

  const result: Record<string, any> = deepClone(target);

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      sourceValue !== undefined &&
      sourceValue !== null &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue)
    ) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = source[key];
    }
  }

  return result as T & V;
}

export { deepClone, deepMerge };
