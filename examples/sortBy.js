import { sortBy } from "../src/sortBy/sortBy-utility.js";

console.log("--- String Selector Examples ---");

const users = [
  { name: "Ali", age: 28 },
  { name: "Sara", age: 22 },
  { name: "Ahmed", age: 25 },
  { name: "Ayesha", age: 30 },
];

console.log("Sort by age ascending:", sortBy(users, "age"));

console.log(
  "Sort by age descending:",
  sortBy(users, "age", "desc")
);

console.log("Sort by name ascending:", sortBy(users, "name"));

console.log(
  "Sort by name descending:",
  sortBy(users, "name", "desc")
);

console.log("\n--- Function Selector Examples ---");

const products = [
  { name: "Laptop", price: 1200, quantity: 2 },
  { name: "Mouse", price: 25, quantity: 10 },
  { name: "Keyboard", price: 80, quantity: 5 },
  { name: "Monitor", price: 300, quantity: 3 },
];

console.log(
  "Sort numbers by absolute value:",
  sortBy([-10, 4, -2, 8], Math.abs)
);

console.log(
  "Sort words by length:",
  sortBy(["watermelon", "fig", "apple", "kiwi"], word => word.length)
);

console.log(
  "Sort products by total value:",
  sortBy(products, product => product.price * product.quantity)
);

console.log(
  "Sort products by total value descending:",
  sortBy(
    products,
    product => product.price * product.quantity,
    "desc"
  )
);

console.log("\n--- Missing Value Examples ---");

const employees = [
  { name: "Hamza", salary: 75000 },
  { name: "Noor" },
  { name: "Bilal", salary: null },
  { name: "Hira", salary: 60000 },
  { name: "Usman", salary: undefined },
];

console.log(
  "Missing salaries ascending:",
  sortBy(employees, "salary")
);

console.log(
  "Missing salaries descending:",
  sortBy(employees, "salary", "desc")
);

console.log(
  "Missing names ascending:",
  sortBy(
    [
      { name: "Zara" },
      { id: 2 },
      { name: null },
      { name: "Arham" },
    ],
    "name"
  )
);

console.log(
  "All values missing:",
  sortBy(
    [{ score: null }, {}, { score: undefined }],
    "score"
  )
);

console.log("\n--- Edge Case Examples ---");

console.log(
  "Empty array:",
  sortBy([], "value")
);

console.log(
  "Single item:",
  sortBy([{ name: "Ali" }], "name")
);

console.log(
  "Duplicate values:",
  sortBy(
    [
      { name: "Ali", score: 90 },
      { name: "Sara", score: 80 },
      { name: "Ahmed", score: 90 },
      { name: "Ayesha", score: 80 },
    ],
    "score"
  )
);

const original = [
  { name: "Sara", age: 22 },
  { name: "Ali", age: 28 },
];

const sorted = sortBy(original, "age");

console.log("Original array:", original);
console.log("Sorted array:", sorted);
console.log("Returns a new array:", original !== sorted);

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
  sortBy("hello", "length");
});

logExpectedError("object values", () => {
  sortBy({ name: "Ali" }, "name");
});

logExpectedError("invalid selector", () => {
  sortBy(users, 123);
});

logExpectedError("invalid direction", () => {
  sortBy(users, "age", "ascending");
});