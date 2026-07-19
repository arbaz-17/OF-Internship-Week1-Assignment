# Unique Utilities

## Overview

This module contains two utilities for removing duplicate values from an array:

- `unique` — removes duplicates using normal JavaScript value and reference equality.
- `uniqueDeep` — removes duplicates by comparing supported arrays and plain objects by content.

Both utilities preserve the first occurrence of each value and do not modify the original array.

---

# `unique`

## Purpose

The `unique` utility removes duplicate values while following standard JavaScript equality behavior.

It compares:

- primitive values by value;
- arrays, objects, and functions by reference.

Two separate objects with identical contents are not considered duplicates unless they are the same reference.

## Function Signature

```js
unique(values)
```

## Input

### `values`

An array containing the values to process.

## Output

Returns a new array containing only the first occurrence of each value.

### Reference equality

```js
const user = { id: 1 };

unique([
  user,
  user,
  { id: 1 }
]);

// [
//   user,
//   { id: 1 }
// ]
```

The repeated `user` reference is removed, but the separate object remains.

## Algorithm

1. Validate that `values` is an array.
2. Create an empty result array.
3. Iterate through each input value.
4. Compare the current value with every value already stored in the result.
5. Treat two values as equal when:
   - strict equality returns `true`; or
   - both values are `NaN`.
6. Add the current value only when no equal value already exists.
7. Return the result array.

## Complexity

Let `n` be the number of values in the input.

- Time complexity: `O(n²)`
- Space complexity: `O(n)`

The nested comparison loop can compare each value with many previously accepted values.

---

# `uniqueDeep`

## Purpose

The `uniqueDeep` utility removes duplicates using content-based comparison for supported arrays and plain objects.

It compares:

- primitive values by value;
- arrays recursively by length, position and content;
- plain objects recursively by keys and values;
- arrays inside objects;
- objects inside arrays;
- nested combinations of arrays and plain objects.

Like `unique`, it preserves the first occurrence of each value.

## Function Signature

```js
uniqueDeep(values)
```

## Input

### `values`

An array containing the values to process.

The input array may contain primitives, arrays, plain objects, or nested combinations of those values.

## Output

Returns a new array containing the first structurally unique occurrence of each supported value.

```js
uniqueDeep([
  { id: 1 },
  { id: 1 },
  { id: 2 }
]);

// [
//   { id: 1 },
//   { id: 2 }
// ]
```

### Nested arrays and objects

```js
uniqueDeep([
  {
    id: 1,
    skills: ["JavaScript", "CSS"]
  },
  {
    id: 1,
    skills: ["JavaScript", "CSS"]
  },
  {
    id: 2,
    skills: ["HTML"]
  },
  [1, { active: true }],
  [1, { active: true }]
]);

// [
//   {
//     id: 1,
//     skills: ["JavaScript", "CSS"]
//   },
//   {
//     id: 2,
//     skills: ["HTML"]
//   },
//   [1, { active: true }]
// ]
```

### Array order

Array order affects equality.

```js
uniqueDeep([
  [1, 2],
  [2, 1]
]);

// [
//   [1, 2],
//   [2, 1]
// ]
```

The arrays remain because their values appear in different positions.

## Algorithm

1. Validate that `values` is an array.
2. Create an empty result array.
3. Iterate through each input value.
4. Compare the current value with every value already stored in the result.
5. Compare values using the following rules:
   - use strict equality for identical primitive values or references;
   - recursively compare arrays by length and position;
   - recursively compare plain objects by keys and values;
   - treat unsupported object types as equal only when they share the same reference.
6. Add the current value only when no deeply equal value already exists.
7. Return the result array.

## Complexity

Let `n` be the number of top-level input values, and let `m` represent the size of the nested structure being compared.

- Worst-case time complexity: `O(n² × m)`
- Result space complexity: `O(n)`
- Recursive call-stack space: `O(d)`

`d` is the maximum nesting depth of the compared arrays and objects.

The exact running time depends on both the number of input values and the amount of nested data compared.

---

# Difference Between the Utilities

```js
const first = { id: 1 };
const second = { id: 1 };

unique([first, second]);
// [first, second]

uniqueDeep([first, second]);
// [first]
```

`unique` sees two different object references.

`uniqueDeep` sees two plain objects with equal contents.

Use `unique` for normal JavaScript uniqueness and `uniqueDeep` when supported nested structures should be compared by content.

## Example Files

Runnable examples can be stored at:

```text
examples/unique.js
examples/uniqueDeep.js
```

## Implementation Notes

Both utilities use the same duplicate-removal pattern:

1. build a new result array;
2. compare each incoming value with previously accepted values;
3. keep only the first matching occurrence.

The difference is the equality strategy.

`unique` uses strict equality with explicit `NaN` handling.

`uniqueDeep` extends that behavior with recursive comparison for arrays and plain objects. It can reuse the existing `objectComparison` utility for plain-object comparison. (Its a part of the assignment.)

Neither function mutates the original array or clones the values stored in the result.

## Limitations

### `unique`

- Separate arrays or objects with equal contents are considered different.
- Objects, arrays, and functions are compared only by reference.

### `uniqueDeep`

- Special object types such as `Date`, `Map`, `Set`, `RegExp`, and class instances are not compared by content.
- Separate unsupported objects are considered different even when they represent equivalent data.
- Values stored in the returned array are not cloned.