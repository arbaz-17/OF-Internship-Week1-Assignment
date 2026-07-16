export function transformObject(object, transformer) {
  const isPlainObject =
    typeof object === "object" &&
    object !== null &&
    !Array.isArray(object);

  if (!isPlainObject) {
    throw new TypeError(
      "Input must be a plain object"
    );
  }

  if (typeof transformer !== "function") {
    throw new TypeError(
      "Transformer must be a function"
    );
  }

  const result = {};

  for (const [key, value] of Object.entries(object)) {
    const transformedEntry = transformer(
      value,
      key,
      object
    );

    if (transformedEntry === null) {
      continue;
    }

    if (
      !Array.isArray(transformedEntry) ||
      transformedEntry.length !== 2
    ) {
      throw new TypeError(
        "Transformer must return [key, value] or null"
      );
    }

    const [newKey, newValue] = transformedEntry;

    if (
      typeof newKey !== "string" &&
      typeof newKey !== "symbol"
    ) {
      throw new TypeError(
        "Transformed key must be a string or symbol"
      );
    }

    result[newKey] = newValue;
  }

  return result;
}