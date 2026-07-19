import { transformObject } from "../src/objectTransformation/transformObject-utility.js";


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

console.log("--- Basic Transformation Examples ---");

const user = {
  name: "Ali",
  age: 25,
  active: true,
};

console.log(
  "Double numeric values:",
  transformObject(user, (value) =>
    typeof value === "number"
      ? value * 2
      : value
  )
);

console.log(
  "Uppercase string values:",
  transformObject(user, (value) =>
    typeof value === "string"
      ? value.toUpperCase()
      : value
  )
);


console.log("\n--- Nested Object and Array Examples ---");

const profile = {
  user: {
    name: "Sara",
    address: {
      city: "Lahore",
      postalCode: 54000,
    },
  },
  scores: [10, 20, 30],
  projects: [
    {
      name: "Portfolio",
      completed: true,
    },
    {
      name: "Dashboard",
      completed: false,
    },
  ],
};

console.log(
  "Transform nested numeric values:",
  transformObject(profile, (value) =>
    typeof value === "number"
      ? value + 1
      : value
  )
);

console.log(
  "Transform nested string values:",
  transformObject(profile, (value) =>
    typeof value === "string"
      ? value.toUpperCase()
      : value
  )
);


console.log("\n--- Key and Index Examples ---");

console.log(
  "Transform a specific property:",
  transformObject(
    {
      firstName: "ali",
      city: "lahore",
    },
    (value, key) =>
      key === "firstName"
        ? value.toUpperCase()
        : value
  )
);

console.log(
  "Use array indexes:",
  transformObject(
    {
      values: [10, 10, 10],
    },
    (value, key) =>
      typeof key === "number"
        ? value + key
        : value
  )
);


console.log("\n--- Immutability Examples ---");

const original = {
  user: {
    name: "Ahmed",
    skills: ["JavaScript", "CSS"],
  },
};

const transformed = transformObject(
  original,
  (value) =>
    typeof value === "string"
      ? value.toUpperCase()
      : value
);

console.log("Original object:", original);
console.log("Transformed object:", transformed);

console.log(
  "Returns a new top-level object:",
  transformed !== original
);

console.log(
  "Creates a new nested object:",
  transformed.user !== original.user
);

console.log(
  "Creates a new nested array:",
  transformed.user.skills !== original.user.skills
);



console.log("\n--- Error Handling Examples ---");

logExpectedError("array input", () => {
  transformObject([], (value) => value);
});

logExpectedError("string input", () => {
  transformObject("hello", (value) => value);
});

logExpectedError("null input", () => {
  transformObject(null, (value) => value);
});

logExpectedError("Date input", () => {
  transformObject(new Date(), (value) => value);
});

logExpectedError("invalid transformer", () => {
  transformObject({}, "transform");
});
