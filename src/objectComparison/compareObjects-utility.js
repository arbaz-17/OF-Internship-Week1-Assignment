import isPlainObject from "../helper.js";

function areArraysEqual(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let index = 0; index < arrayA.length; index++) {
    if (!areValuesEqual(arrayA[index], arrayB[index])) {
      return false;
    }
  }

  return true;
}

function areValuesEqual(valueA, valueB) {
  if (
    valueA === valueB ||
    (Number.isNaN(valueA) && Number.isNaN(valueB))
  ) {
    return true;
  }

  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    return areArraysEqual(valueA, valueB);
  }

  if (
    isPlainObject(valueA) &&
    isPlainObject(valueB)
  ) {
    return objectComparison(valueA, valueB);
  }

  return false;
}

export function objectComparison(objectA, objectB) {
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