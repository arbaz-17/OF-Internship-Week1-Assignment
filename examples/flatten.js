import { flatten } from "../src/flatten/flatten-utility.js";


console.log("--- Basic Array Examples ---");

console.log(
  "Default depth:",
  flatten([1, [2, 3], [4, [5]]])
);


console.log(
  "Already flat:",
  flatten([1, 2, 3, 4])
);


console.log(
  "Empty array:",
  flatten([])
);


console.log(
  "Nested empty arrays:",
  flatten([1, [], [2, []], 3])
);



console.log("\n--- Depth Examples ---");


console.log(
  "Depth 1:",
  flatten([1, [2, [3, [4]]]], 1)
);


console.log(
  "Depth 2:",
  flatten([1, [2, [3, [4]]]], 2)
);



console.log(
  "Infinite depth:",
  flatten([1, [2, [3, [4, [5]]]]], Infinity)
);



console.log("\n--- Mixed Value Examples ---");

console.log(
  "Mixed primitive values:",
  flatten([
    1,
    ["hello", true],
    [null, [undefined, false]],
  ], Infinity)
);


const user = { name: "John" };

console.log(
  "Objects remain unchanged:",
  flatten([user, [{ id: 1 }], [[{ id: 2 }]]], Infinity)
);

console.log(
  "Only arrays are flattened:",
  flatten([
    new Set([1, 2]),
    ["text"],
    { values: [3, 4] },
  ], Infinity)
);



console.log("\n--- Immutability Examples ---");

const nestedArray = [2, 3];
const originalArray = [1, nestedArray, 4];

const flattenedArray = flatten(originalArray, 0);

console.log(
  "Original array:",
  originalArray
);

console.log(
  "Returned array:",
  flattenedArray
);

console.log(
  "Returns a new top-level array:",
  flattenedArray !== originalArray
);


console.log(
  "Preserves nested references at depth 0:",
  flattenedArray[1] === nestedArray
);






console.log("\n--- Special Array Edge Cases ---");

const sparseArray = [1, , [2, , 3]];

console.log(
  "Sparse array:",
  flatten(sparseArray, Infinity)
);


console.log(
  "Arrays containing only arrays:",
  flatten([[[[]]]], Infinity)
);


console.log(
  "Repeated values:",
  flatten([[1, 1], [[1, 1]]], Infinity)
);





console.log("\n--- Error Handling Examples ---");


logExpectedError("string input", () => {
  flatten("hello");
});

logExpectedError("number input", () => {
  flatten(123);
});

logExpectedError("object input", () => {
  flatten({ values: [1, 2, 3] });
});

logExpectedError("null input", () => {
  flatten(null);
});

logExpectedError("undefined input", () => {
  flatten(undefined);
});

