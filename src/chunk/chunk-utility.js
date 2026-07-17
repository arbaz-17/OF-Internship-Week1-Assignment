export function chunk(values, size) {
  if (typeof values !== "string" && !Array.isArray(values)) {
    throw new TypeError("Input must be a string or an array.");
  }

  if (size < 1 || !Number.isInteger(size)) {
    throw new RangeError("Size must be an integer greater than 0");
  }

  const result = [];
  let currentChunk = [];

  for (const item of values) {
    currentChunk.push(item);

    if (currentChunk.length === size) {
      result.push(currentChunk);
      currentChunk = [];
    }
  }

  if (currentChunk.length > 0) {
    result.push(currentChunk);
  }

  return result;
}


const myData = [1, 2, 3, 4, 5];
const chunkedData = chunk(myData, 2);

console.log(chunkedData);