import isPlainObject from "../helper.js";
import { objectComparison } from "../objectComparison/compareObjects-utility.js";

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

export function uniqueDeep(values) {
  if (!Array.isArray(values)) {
    throw new TypeError("Values must be an array");
  }

  const result = [];

  for (const item of values) {
    let alreadyExists = false;

    for (const existingItem of result) {
      if (areValuesEqual(item, existingItem)) {
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