import { groupBy } from "../src/groupBy/groupBy-utility.js";

console.log("--- String Selector Examples ---");

const users = [
  { name: "Ali", role: "admin", city: "Lahore" },
  { name: "Sara", role: "user", city: "Karachi" },
  { name: "Ahmed", role: "admin", city: "Lahore" },
  { name: "Ayesha", role: "user", city: "Islamabad" },
  { name: "Zain", role: "editor", city: "Karachi" },
];

console.log("Group by role:", groupBy(users, "role"));

console.log("Group by city:", groupBy(users, "city"));

console.log(
  "Group by department:",
  groupBy(
    [
      { name: "Hamza", department: "Engineering" },
      { name: "Noor", department: "Design" },
      { name: "Bilal", department: "Engineering" },
      { name: "Hira", department: "Marketing" },
    ],
    "department"
  )
);

console.log(
  "Group by active status:",
  groupBy(
    [
      { name: "Ali", active: true },
      { name: "Sara", active: false },
      { name: "Ahmed", active: true },
      { name: "Ayesha", active: false },
    ],
    "active"
  )
);

console.log("\n--- Function Selector Examples ---");

console.log(
  "Group numbers by even and odd:",
  groupBy([1, 2, 3, 4, 5, 6], number =>
    number % 2 === 0 ? "even" : "odd"
  )
);

console.log(
  "Group words by length:",
  groupBy(
    ["apple", "fig", "kiwi", "mango", "pear"],
    word => word.length
  )
);

console.log(
  "Group people by age range:",
  groupBy(
    [
      { name: "Ali", age: 17 },
      { name: "Sara", age: 25 },
      { name: "Ahmed", age: 14 },
      { name: "Ayesha", age: 32 },
    ],
    person => person.age >= 18 ? "adult" : "minor"
  )
);

console.log(
  "Group products by price range:",
  groupBy(
    [
      { name: "Mouse", price: 25 },
      { name: "Laptop", price: 1200 },
      { name: "Keyboard", price: 80 },
      { name: "Monitor", price: 300 },
    ],
    product => {
      if (product.price < 100) return "budget";
      if (product.price < 500) return "mid-range";
      return "premium";
    }
  )
);

console.log("\n--- Missing Value Examples ---");

const employees = [
  { name: "Hamza", department: "Engineering" },
  { name: "Noor" },
  { name: "Bilal", department: null },
  { name: "Hira", department: "Design" },
  { name: "Usman", department: undefined },
];

console.log(
  "Missing property values:",
  groupBy(employees, "department")
);

console.log(
  "All properties missing:",
  groupBy(
    [{ name: "Ali" }, { name: "Sara" }, { name: "Ahmed" }],
    "role"
  )
);

console.log(
  "Null values from function selector:",
  groupBy(
    [1, 2, 3, 4],
    number => number > 2 ? "large" : null
  )
);

console.log(
  "Undefined values from function selector:",
  groupBy(
    ["apple", "", "banana", ""],
    value => value || undefined
  )
);

console.log("\n--- Edge Case Examples ---");

console.log(
  "Empty array:",
  groupBy([], "category")
);

console.log(
  "Single item:",
  groupBy([{ name: "Ali", role: "admin" }], "role")
);

console.log(
  "Every item in one group:",
  groupBy(
    [
      { name: "Ali", country: "Pakistan" },
      { name: "Sara", country: "Pakistan" },
      { name: "Ahmed", country: "Pakistan" },
    ],
    "country"
  )
);

const original = [
  { name: "Ali", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ahmed", role: "admin" },
];

const grouped = groupBy(original, "role");

console.log("Original array:", original);
console.log("Grouped result:", grouped);
console.log(
  "Original array remains unchanged:",
  original.length === 3
);
console.log(
  "Items keep their original references:",
  grouped.admin[0] === original[0]
);

console.log("\n--- Error Handling Examples ---");

function logExpectedError(label, callback) {
  try {
    callback();
  } catch (error) {
    console.error(
      `Caught expected error (${label}):`,
      `${error.name}: ${error.message}`
    );
  }
}

logExpectedError("string values", () => {
  groupBy("hello", "length");
});

logExpectedError("object values", () => {
  groupBy({ name: "Ali" }, "name");
});

logExpectedError("invalid selector", () => {
  groupBy(users, 123);
});

logExpectedError("null item with string selector", () => {
  groupBy([{ role: "admin" }, null], "role");
});