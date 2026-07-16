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

export function compareObjects(objectA, objectB) {
  if (!isPlainObject(objectA) || !isPlainObject(objectB)) {
    throw new TypeError(
      "Both inputs must be plain objects"
    );
  }

  function deepEqual(valueA, valueB) {
    if (Object.is(valueA, valueB)) {
      return true;
    }

    if (
      valueA === null ||
      valueB === null ||
      typeof valueA !== "object" ||
      typeof valueB !== "object"
    ) {
      return false;
    }

    if (
      !isPlainObject(valueA) ||
      !isPlainObject(valueB)
    ) {
      throw new TypeError(
        "Only primitives and nested plain objects are supported"
      );
    }

    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Object.hasOwn(valueB, key)) {
        return false;
      }

      if (!deepEqual(valueA[key], valueB[key])) {
        return false;
      }
    }

    return true;
  }

  return deepEqual(objectA, objectB);
}