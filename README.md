# JavaScript Utility Library

A collection of Week 1 assignment submissions and foundational JavaScript tasks completed for the **OptimusFox Internship Program**.

This repository contains a custom JavaScript utility library built without Lodash. The utilities focus on core JavaScript concepts such as arrays, objects, functions, recursion, comparison, validation, and modern ES module syntax.

Each utility is organized in its own folder and includes a dedicated `README.md` containing its purpose, inputs, output, algorithm, examples, limitations, and complexity.

## Utilities

| Utility | Purpose |
|---|---|
| `chunk` | Divides an array or string into smaller groups of a specified size. |
| `flatten` | Reduces the nesting level of an array using a configurable depth. |
| `sortBy` | Returns a new array sorted by a property or selector function. |
| `groupBy` | Groups array items by a property or selector function. |
| `deepClone` | Recursively clones primitives, arrays, and plain objects. |
| `objectComparison` | Deeply compares plain objects containing nested arrays and objects. |
| `transformObject` | Recursively applies a transformer function to object leaf values. |
| `unique` | Removes duplicates using normal JavaScript value and reference equality. |
| `uniqueDeep` | Removes duplicates by comparing supported arrays and plain objects by content. |

## Project Structure

```text
.
├── examples/
│   ├── chunk.js
│   ├── flatten.js
│   ├── sortBy.js
│   └── ...
├── src/
│   ├── chunk/
│   │   ├── chunk.js
│   │   └── README.md
│   ├── flatten/
│   │   ├── flatten.js
│   │   └── README.md
│   └── ...
├── helper.js
├── index.js
└── README.md
```


## Examples

The `examples` folder contains runnable files for testing each utility.

For example:

```bash
node examples/chunk.js
```

Each example imports the relevant utility, provides sample input, and logs the result.

## Getting Started

1. Clone the repository.
2. Open the project folder.
3. Make sure Node.js is installed.
4. Run any file from the `examples` folder.

```bash
git clone https://github.com/arbaz-17/OF-Internship-Week1-Assignment.git
cd JS-UTILITY-LIBRARY
node examples/chunk.js
```

## Notes

- Lodash is not used.
- The utilities are implemented for learning purposes with reduced reliance on high-level built-in methods.
- Detailed behavior and known limitations are documented inside each utility folder.