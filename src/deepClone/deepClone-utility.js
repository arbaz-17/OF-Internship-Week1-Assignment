 function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return (
    prototype === Object.prototype ||
    prototype === null
  );
}

export function deepClone(value) {

  if (value === null || typeof value !== "object") {
    if (typeof value === "function") {
      throw new TypeError(
        "Functions are not supported by deepClone"
      );
    }

    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  if (!isPlainObject(value)) {
    throw new TypeError(
      "deepClone supports only primitives, arrays, and plain objects"
    );
  }

  const result = {};

  for (const key of Object.keys(value)) {
    result[key] = deepClone(value[key]);
  }

  return result;
}