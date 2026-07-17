function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function deepClone(value) {
  if (
    value === null ||
    typeof value !== "object"
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  if (isPlainObject(value)) {
    const clone = {};

    for (const key of Object.keys(value)) {
      clone[key] = deepClone(value[key]);
    }

    return clone;
  }

  throw new TypeError(
    "deepClone only supports primitives, arrays, and plain objects"
  );
}