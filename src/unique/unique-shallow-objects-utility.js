import isPlainObject from "../helper";

function areObjectsEqual(objectA, objectB) {
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

    const valuesAreEqual =
      valueA === valueB ||
      (Number.isNaN(valueA) && Number.isNaN(valueB));

    if (!valuesAreEqual) {
      return false;
    }
  }

  return true;
}

export function uniqueObjects(values) {
  if (!Array.isArray(values)) {
    throw new TypeError("Values must be an array");
  }

  const result = [];

  for (const item of values) {
    if (!isPlainObject(item)) {
      throw new TypeError(
        "Values must contain only plain objects"
      );
    }

    let alreadyExists = false;

    for (const existingItem of result) {
      if (areObjectsEqual(item, existingItem)) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      result.push(item);
    }
  }

  return result;
}