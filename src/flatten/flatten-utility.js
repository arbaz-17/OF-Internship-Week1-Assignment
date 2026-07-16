export function flatten(values, depth = 1) {
  if (!Array.isArray(values)) {
    throw new TypeError("Values must be an array");
  }

  const isValidDepth =
    depth === Infinity ||
    (Number.isInteger(depth) && depth >= 0);

  if (!isValidDepth) {
    throw new RangeError(
      "Depth must be a non-negative integer or Infinity"
    );
  }

  const result = [];

  function flattenInto(items, remainingDepth) {
    for (const item of items) {
      if (
        Array.isArray(item) && remainingDepth > 0
      ) {
        const nextDepth = remainingDepth === Infinity
            ? Infinity
            : remainingDepth - 1;

        flattenInto(item, nextDepth);

        
      } else {
        result.push(item);
      }
    }
  }

  flattenInto(values, depth);

  return result;
}


const basicArray = [1, [2, 3], [[4, 5]]];
console.log("Default Depth (1):", flatten(basicArray, 3));