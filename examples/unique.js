import { unique } from "../src/unique/unique-utility";

function logExpectedError(label, callback) {
  try {
    callback();
  } catch (error) {
    console.error(
      `Caught expected error (${label}):`,
      error.message
    );
  }
}

console.log("--- Primitive Value Examples ---");

console.log(
  "Duplicate numbers:",
  unique([1, 2, 2, 3, 1, 4])
);

console.log(
  "Duplicate strings:",
  unique([
    "JavaScript",
    "CSS",
    "JavaScript",
    "HTML",
    "CSS",
  ])
);

console.log(
  "Duplicate booleans:",
  unique([true, false, true, false])
);

console.log(
  "Null and undefined:",
  unique([
    null,
    undefined,
    null,
    undefined,
  ])
);

console.log(
  "Empty array:",
  unique([])
);




console.log("\n--- Reference Equality Examples ---");

const firstUser = {
  id: 1,
  name: "Ali",
};

const secondUser = {
  id: 1,
  name: "Ali",
};

console.log(
  "Repeated and separate object references:",
  unique([
    firstUser,
    firstUser,
    secondUser,
  ])
);

const firstArray = [1, 2];
const secondArray = [1, 2];

console.log(
  "Repeated and separate array references:",
  unique([
    firstArray,
    firstArray,
    secondArray,
  ])
);


console.log("\n--- Function Reference Examples ---");

function greet() {
  return "Hello";
}

const anotherGreet = function () {
  return "Hello";
};

console.log(
  "Repeated and separate function references:",
  unique([
    greet,
    greet,
    anotherGreet,
  ])
);


console.log("\n--- Mixed Value Examples ---");

const sharedObject = {
  active: true,
};

console.log(
  "Mixed values:",
  unique([
    1,
    "1",
    true,
    true,
    null,
    undefined,
    NaN,
    NaN,
    sharedObject,
    sharedObject,
    { active: true },
    [1, 2],
    [1, 2],
  ])
);


console.log("\n--- Order Preservation Example ---");

console.log(
  "First occurrence is preserved:",
  unique([3, 1, 3, 2, 1, 4, 2])
);




console.log("\n--- Error Handling Examples ---");

logExpectedError("string input", () => {
  unique("hello");
});

logExpectedError("number input", () => {
  unique(123);
});

logExpectedError("object input", () => {
  unique({
    values: [1, 2, 3],
  });
});

logExpectedError("null input", () => {
  unique(null);
});

logExpectedError("undefined input", () => {
  unique(undefined);
});