function sortBy(values, selector, direction = "asc") {
  if (!Array.isArray(values)) {
    throw new TypeError("Values must be an array");
  }

  if (!(typeof selector === "function" || typeof selector === "string")) {
    throw new TypeError("Selector must be a function or string");
  }

  if (direction !== "asc" && direction !== "desc") {
    throw new RangeError(
      'Direction must be either "asc" or "desc"'
    );
  }

  const result = [...values];

  result.sort((itemA, itemB) => {
    const valueA =
      typeof selector === "function"
        ? selector(itemA)
        : itemA[selector];

    const valueB =
      typeof selector === "function"
        ? selector(itemB)
        : itemB[selector];

    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return 1; 
    if (valueB == null) return -1; 

    let comparison = 0;

    if (valueA < valueB) {
      comparison = -1;
    } else if (valueA > valueB) {
      comparison = 1;
    }

    return direction === "desc"
      ? -comparison
      : comparison;
  });

  return result;
}





const users = [
  { name: "Ali", age: 28 },
  { name: "Sara", age: 22 },
  { name: "Ahmed", age: 25 },
  { name: "Ayesha" }, 
  { name: "Zain", age: null }
];

console.log("Sort by age (asc):");
console.log(sortBy(users, "age"));

console.log("\nSort by age (desc):");
console.log(sortBy(users, "age", "desc"));
