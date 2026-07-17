import { objectComparision } from "../src/objectComparison/compareObjects-utility.js";

console.log("--- Basic Object Comparisons ---");

console.log(
  "Equal objects:",
  objectComparision(
    { name: "Ali", age: 28 },
    { name: "Ali", age: 28 }
  )
);

console.log(
  "Different values:",
  objectComparision(
    { name: "Ali", age: 28 },
    { name: "Ali", age: 25 }
  )
);

console.log(
  "Different property order:",
  objectComparision(
    { name: "Sara", age: 22 },
    { age: 22, name: "Sara" }
  )
);

console.log(
  "Different number of properties:",
  objectComparision(
    { name: "Ahmed", age: 25 },
    { name: "Ahmed" }
  )
);

console.log("\n--- Nested Object Comparisons ---");

console.log(
  "Equal nested objects:",
  objectComparision(
    {
      user: {
        name: "Ayesha",
        address: {
          city: "Lahore",
        },
      },
    },
    {
      user: {
        name: "Ayesha",
        address: {
          city: "Lahore",
        },
      },
    }
  )
);

console.log(
  "Different nested values:",
  objectComparision(
    {
      user: {
        name: "Zain",
        address: {
          city: "Karachi",
        },
      },
    },
    {
      user: {
        name: "Zain",
        address: {
          city: "Islamabad",
        },
      },
    }
  )
);

console.log(
  "Missing nested property:",
  objectComparision(
    {
      profile: {
        name: "Hamza",
        age: 30,
      },
    },
    {
      profile: {
        name: "Hamza",
      },
    }
  )
);

console.log(
  "Deeply equal objects:",
  objectComparision(
    {
      settings: {
        account: {
          privacy: {
            visible: true,
          },
        },
      },
    },
    {
      settings: {
        account: {
          privacy: {
            visible: true,
          },
        },
      },
    }
  )
);

console.log("\n--- Special Value Comparisons ---");

console.log(
  "NaN values:",
  objectComparision(
    { score: NaN },
    { score: NaN }
  )
);

console.log(
  "Null values:",
  objectComparision(
    { value: null },
    { value: null }
  )
);

console.log(
  "Undefined values:",
  objectComparision(
    { value: undefined },
    { value: undefined }
  )
);

console.log(
  "Different primitive types:",
  objectComparision(
    { value: 10 },
    { value: "10" }
  )
);

console.log("\n--- Reference Value Comparisons ---");

const sharedArray = [1, 2, 3];
const sharedDate = new Date("2025-01-01");
const sharedFunction = () => "hello";

console.log(
  "Same array reference:",
  objectComparision(
    { values: sharedArray },
    { values: sharedArray }
  )
);

console.log(
  "Different arrays with equal values:",
  objectComparision(
    { values: [1, 2, 3] },
    { values: [1, 2, 3] }
  )
);

console.log(
  "Same Date reference:",
  objectComparision(
    { createdAt: sharedDate },
    { createdAt: sharedDate }
  )
);

console.log(
  "Same function reference:",
  objectComparision(
    { handler: sharedFunction },
    { handler: sharedFunction }
  )
);

console.log("\n--- Edge Case Examples ---");

console.log(
  "Empty objects:",
  objectComparision({}, {})
);

console.log(
  "Same keys with different ownership:",
  objectComparision(
    { name: "Ali" },
    { age: 28 }
  )
);

console.log(
  "Zero and negative zero:",
  objectComparision(
    { value: 0 },
    { value: -0 }
  )
);

console.log(
  "Boolean difference:",
  objectComparision(
    { active: true },
    { active: false }
  )
);
