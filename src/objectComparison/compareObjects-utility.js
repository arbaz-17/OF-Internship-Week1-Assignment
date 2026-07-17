import isPlainObject from "../helper";

function areValuesEqual(valueA, valueB) {
  if (
    valueA === valueB ||
    (Number.isNaN(valueA) && Number.isNaN(valueB))
  ) {
    return true;
  }

  if (
    isPlainObject(valueA) &&
    isPlainObject(valueB)
  ) {
    return objectComparision(valueA, valueB);
  }

  return false;
}

export function objectComparision(objectA, objectB) {
  if (
    !isPlainObject(objectA) ||
    !isPlainObject(objectB)
  ) {
    throw new TypeError(
      "Both values must be plain objects"
    );
  }

  const keysA = Object.keys(objectA);
  const keysB = Object.keys(objectB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.hasOwn(objectB, key)) {
      return false;
    }

    const valueA = objectA[key];
    const valueB = objectB[key];

    if (!areValuesEqual(valueA, valueB)) {
      return false;
    }
  }

  return true;
}