function groupBy(values, selector) {


  if (!Array.isArray(values)) {
    throw new TypeError("Values must be an array");
  }

if (!(typeof selector === "function" || typeof selector === "string")) {
  throw new TypeError("Selector must be a function or string");
}

  const result = {};

  for (const item of values) {
    if (
      typeof selector !== "function" &&
      (item === null || item === undefined)
    ) {
      throw new TypeError(
        "Cannot access a property on null or undefined"
      );
    }

    const groupKey =
      typeof selector === "function"
        ? selector(item)
        : item[selector];

    if (!Object.hasOwn(result, groupKey)) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);
  }

  return result;
}


// Property-name example
const users = [
  { name: "Ali", role: "developer" },
  { name: "Sara", role: "designer" },
  { name: "Ahmed", role: "developer" },
  { name: "Ayesha" },
];

console.log(groupBy(users, "role"));

// Callback example
const numbers = [1, 2, 3, 4, 5, 6];

console.log(
  groupBy(numbers, (number) =>
    number % 2 === 0 ? "even" : "odd"
  )
);