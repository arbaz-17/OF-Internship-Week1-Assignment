import { chunk } from "../src/chunk/chunk-utility.js";



console.log("--- Array Examples ---");

console.log("Even chunks:", chunk([1, 2, 3, 4], 2));
console.log("With remainder:", chunk([1, 2, 3, 4, 5], 2));
console.log("Size > length:", chunk([1, 2, 3], 5));
console.log("Empty array:", chunk([], 3));


console.log("\n--- String Examples ---");

console.log("Even string:", chunk("abcdef", 2));
console.log("String remainder:", chunk("hello", 3));
console.log("Empty string:", chunk("", 2));


console.log("\n--- Error Handling Examples ---");

try {
  chunk([1, 2, 3], 0);
} catch (error) {
  console.error("Caught expected error (size 0):", error.message);
}

try {
  chunk([1, 2, 3], -2);
} catch (error) {
  console.error("Caught expected error (negative size):", error.message);
}

try {
  chunk([1, 2, 3], 2.5);
} catch (error) {
  console.error("Caught expected error (float size):", error.message);
}

try {
  chunk(123456, 2);
} catch (error) {
  console.error("Caught expected error (number input):", error.message);
}

try {
  chunk({ name: "John", age: 30 }, 2);
} catch (error) {
  console.error("Caught expected error (object input):", error.message);
}

try {
  chunk(null, 2);
} catch (error) {
  console.error("Caught expected error (null input):", error.message);
}