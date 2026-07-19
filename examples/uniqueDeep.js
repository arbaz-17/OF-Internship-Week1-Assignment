import { uniqueDeep } from "../src/uniqueDeep/unique-deep-utility.js";

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
  uniqueDeep([1, 2, 2, 3, 1])
);

console.log(
  "Duplicate strings:",
  uniqueDeep([
    "JavaScript",
    "CSS",
    "JavaScript",
    "HTML",
  ])
);

console.log(
  "Repeated NaN values:",
  uniqueDeep([NaN, 1, NaN, 2, NaN])
);

console.log(
  "Null and undefined:",
  uniqueDeep([
    null,
    undefined,
    null,
    undefined,
  ])
);

console.log(
  "Empty array:",
  uniqueDeep([])
);


console.log("\n--- Plain Object Examples ---");

console.log(
  "Objects with equal contents:",
  uniqueDeep([
    { id: 1, name: "Ali" },
    { id: 1, name: "Ali" },
    { id: 2, name: "Sara" },
  ])
);

console.log(
  "Property order does not matter:",
  uniqueDeep([
    {
      name: "Ali",
      age: 25,
    },
    {
      age: 25,
      name: "Ali",
    },
  ])
);

console.log(
  "Objects with different properties:",
  uniqueDeep([
    { id: 1 },
    { id: 1, active: true },
    { id: 1 },
  ])
);


console.log("\n--- Nested Object Examples ---");

console.log(
  "Nested objects with equal contents:",
  uniqueDeep([
    {
      user: {
        name: "Ali",
        address: {
          city: "Lahore",
        },
      },
    },
    {
      user: {
        name: "Ali",
        address: {
          city: "Lahore",
        },
      },
    },
    {
      user: {
        name: "Sara",
        address: {
          city: "Karachi",
        },
      },
    },
  ])
);


console.log("\n--- Array Examples ---");

console.log(
  "Arrays with equal contents:",
  uniqueDeep([
    [1, 2, 3],
    [1, 2, 3],
    [3, 2, 1],
  ])
);

console.log(
  "Array order matters:",
  uniqueDeep([
    ["JavaScript", "CSS"],
    ["CSS", "JavaScript"],
    ["JavaScript", "CSS"],
  ])
);

console.log(
  "Nested arrays:",
  uniqueDeep([
    [1, [2, [3]]],
    [1, [2, [3]]],
    [1, [2, [4]]],
  ])
);


console.log("\n--- Mixed Nested Structure Examples ---");

console.log(
  "Objects containing arrays:",
  uniqueDeep([
    {
      id: 1,
      skills: [
        "JavaScript",
        "CSS",
      ],
    },
    {
      id: 1,
      skills: [
        "JavaScript",
        "CSS",
      ],
    },
    {
      id: 2,
      skills: ["HTML"],
    },
  ])
);

console.log(
  "Arrays containing objects:",
  uniqueDeep([
    [
      1,
      {
        active: true,
      },
    ],
    [
      1,
      {
        active: true,
      },
    ],
    [
      1,
      {
        active: false,
      },
    ],
  ])
);

console.log(
  "Deep mixed structures:",
  uniqueDeep([
    {
      teams: [
        {
          name: "Frontend",
          members: [
            {
              id: 1,
              name: "Ali",
            },
          ],
        },
      ],
    },
    {
      teams: [
        {
          name: "Frontend",
          members: [
            {
              id: 1,
              name: "Ali",
            },
          ],
        },
      ],
    },
    {
      teams: [
        {
          name: "Backend",
          members: [
            {
              id: 2,
              name: "Sara",
            },
          ],
        },
      ],
    },
  ])
);


console.log("\n--- Reference and Content Comparison ---");

const firstUser = {
  id: 1,
  name: "Ali",
};

const secondUser = {
  id: 1,
  name: "Ali",
};

console.log(
  "Separate objects with equal contents:",
  uniqueDeep([
    firstUser,
    secondUser,
  ])
);

const sharedObject = {
  active: true,
};

console.log(
  "Repeated reference and equal content:",
  uniqueDeep([
    sharedObject,
    sharedObject,
    {
      active: true,
    },
  ])
);




console.log("\n--- Immutability Example ---");

const originalValues = [
  {
    id: 1,
    skills: ["JavaScript"],
  },
  {
    id: 1,
    skills: ["JavaScript"],
  },
];

const uniqueValues = uniqueDeep(originalValues);

console.log(
  "Original array:",
  originalValues
);

console.log(
  "Returned array:",
  uniqueValues
);

console.log(
  "Returns a new array:",
  uniqueValues !== originalValues
);

console.log(
  "Preserves the first object reference:",
  uniqueValues[0] === originalValues[0]
);


console.log("\n--- Error Handling Examples ---");

logExpectedError("string input", () => {
  uniqueDeep("hello");
});

logExpectedError("number input", () => {
  uniqueDeep(123);
});

logExpectedError("object input", () => {
  uniqueDeep({
    values: [1, 2, 3],
  });
});

logExpectedError("null input", () => {
  uniqueDeep(null);
});

logExpectedError("undefined input", () => {
  uniqueDeep(undefined);
});