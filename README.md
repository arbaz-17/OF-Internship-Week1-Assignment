# OF Internship — Week 1 Assignment

A collection of Week 1 assignment submissions and foundational JavaScript tasks completed for the **OptimusFox Internship Program**.

This repository showcases a custom **JavaScript Utility Library** built without Lodash. Each utility is organized in its own folder and includes a dedicated `README.md` with implementation details and examples.

## Week 1 — JavaScript Core Fundamentals

### Training Topics

- Variables and data types
- Primitive vs. reference values
- Type coercion and equality
- Functions
- Arrays and objects
- Array methods
- Destructuring
- Spread and rest operators
- Template literals
- ES modules

### Learning Outcomes

By completing this assignment, I practiced how to:

- Explain core JavaScript behavior
- Manipulate arrays, objects, and other data structures
- Write reusable utility functions
- Use modern ES syntax
- Organize code into modules
- Document implementations and usage examples

## Weekly Assignment

Build a JavaScript utility library containing the following functions:

| Utility | Description |
| --- | --- |
| `groupBy` | Groups collection items using a property or callback result. |
| `flatten` | Converts nested arrays into a flatter array structure. |
| `unique` | Removes duplicate primitive values or objects from an array. |
| `sortBy` | Sorts a collection using a selected property or callback. |
| `chunk` | Splits an array into smaller arrays of a specified size. |
| `deepClone` | Creates an independent deep copy of a value. |
| Object comparison | Compares objects by their values and structure. |
| Object transformation | Transforms object keys, values, or structure. |

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd JS-UTILITY-LIBRARY
```

### 2. Import a utility

Utilities can be imported from the main entry file:

```js
import {
  chunk,
  deepClone,
  flatten,
  groupBy,
  sortBy,
} from "./src/index.js";
```

You can also import a utility directly from its folder:

```js
import { chunk } from "./src/chunk/chunk-utility.js";
```

## Utility Documentation

Each utility folder contains its own `README.md`, covering details such as:

- Purpose and behavior
- Function parameters
- Return value
- Usage examples
- Edge cases
- Implementation notes

Refer to the relevant folder for utility-specific documentation.

## Key Concepts Practiced

This project applies JavaScript fundamentals including:

- Primitive and reference value handling
- Recursion
- Higher-order functions
- Callback functions
- Array and object iteration
- Shallow and deep comparison
- Immutable data handling
- Modular code organization
- Reusable function design
