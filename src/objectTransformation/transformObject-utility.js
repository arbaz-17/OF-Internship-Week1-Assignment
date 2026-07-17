import isPlainObject from "../helper";

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