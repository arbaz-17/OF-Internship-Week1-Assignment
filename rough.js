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

export function transformObject(object, transformer) {
  if (!isPlainObject(object)) {
    throw new TypeError("Value must be a plain object");
  }

  if (typeof transformer !== "function") {
    throw new TypeError("Transformer must be a function");
  }

  function transformValue(value, key) {
    if (Array.isArray(value)) {
      return value.map((item, index) =>
        transformValue(item, index)
      );
    }

    if (isPlainObject(value)) {
      const result = {};

      for (const currentKey of Object.keys(value)) {
        result[currentKey] = transformValue(
          value[currentKey],
          currentKey
        );
      }

      return result;
    }

    return transformer(value, key);
  }

  return transformValue(object);
}