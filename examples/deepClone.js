
import { deepClone } from "../src/deepClone/deepClone-utility.js";


console.log("--- Object Reference Checks ---");

const originalUser = {
  user: {
    name: "Ali",
    skills: ["JavaScript"],
  },
};

const clonedUser = deepClone(originalUser);

console.log("Top-level object cloned:", clonedUser !== originalUser);
console.log(
  "Nested object cloned:",
  clonedUser.user !== originalUser.user
);
console.log(
  "Nested array cloned:",
  clonedUser.user.skills !== originalUser.user.skills
);
console.log(
  "Values remain equal:",
  clonedUser.user.name === originalUser.user.name
);

console.log("\n--- Array Reference Checks ---");

const originalArray = [
  { id: 1, tags: ["new", "active"] },
  { id: 2, tags: ["pending"] },
];

const clonedArray = deepClone(originalArray);

console.log("Top-level array cloned:", clonedArray !== originalArray);
console.log(
  "First object cloned:",
  clonedArray[0] !== originalArray[0]
);
console.log(
  "Nested tags array cloned:",
  clonedArray[0].tags !== originalArray[0].tags
);
console.log(
  "Primitive value preserved:",
  clonedArray[0].id === originalArray[0].id
);

console.log("\n--- Object Mutation Checks ---");

const originalProfile = {
  name: "Sara",
  address: {
    city: "Karachi",
    country: "Pakistan",
  },
};

const clonedProfile = deepClone(originalProfile);

clonedProfile.name = "Ayesha";
clonedProfile.address.city = "Lahore";

console.log("Original name unchanged:", originalProfile.name === "Sara");
console.log(
  "Original city unchanged:",
  originalProfile.address.city === "Karachi"
);
console.log("Clone name changed:", clonedProfile.name === "Ayesha");
console.log(
  "Clone city changed:",
  clonedProfile.address.city === "Lahore"
);

console.log("\n--- Array Mutation Checks ---");

const originalItems = {
  numbers: [1, 2, 3],
  users: [{ name: "Ali" }, { name: "Ahmed" }],
};

const clonedItems = deepClone(originalItems);

clonedItems.numbers.push(4);
clonedItems.users[0].name = "Hamza";

console.log(
  "Original numbers unchanged:",
  originalItems.numbers.length === 3
);
console.log(
  "Cloned numbers changed:",
  clonedItems.numbers.length === 4
);
console.log(
  "Original nested object unchanged:",
  originalItems.users[0].name === "Ali"
);
console.log(
  "Cloned nested object changed:",
  clonedItems.users[0].name === "Hamza"
);

console.log("\n--- Primitive Value Checks ---");

console.log("Number preserved:", deepClone(42) === 42);
console.log("String preserved:", deepClone("hello") === "hello");
console.log("Boolean preserved:", deepClone(true) === true);
console.log("Null preserved:", deepClone(null) === null);

