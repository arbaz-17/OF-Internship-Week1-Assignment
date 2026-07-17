function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function transformObject(object, transformer) {
  if (!isPlainObject(object)) {
    throw new TypeError("Value must be a plain object");
  }

  if (typeof transformer !== "function") {
    throw new TypeError("Transformer must be a function");
  }

  const result = {};

  for (const key of Object.keys(object)) {
    const value = object[key];

    result[key] = transformer(value, key);
  }

  return result;
}