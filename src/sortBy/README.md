# `SortBy Utility Function`

Sort an array by a property value or selector function.

## Purpose

The `sortBy` function returns a new array whose items are ordered by a selected value.

The sorting value can be obtained in either of two ways:

- by providing a property name as a string;
- by providing a function that returns a value for each item.

The function:

- sorts in ascending order by default;
- supports descending order;
- places `null` and `undefined` sorting values at the end;
- preserves the original array by sorting a shallow copy.

## Function Signature

```js
sortBy(values, selector, direction = "asc")
```

## Input

### `values`

The array containing the items to sort.

```js
const users = [
  { name: "Sara", age: 28 },
  { name: "Ali", age: 22 },
  { name: "Ahmed", age: 31 }
];
```

### `selector`

A string or function that determines the value used to compare each item.

#### Property-name selector

Provide a string to sort objects by one of their properties.

```js
sortBy(users, "age");
```

For each item, the function reads:

```js
item[selector]
```

#### Function selector

Provide a function when the sorting value must be calculated.

```js
sortBy(
  ["pear", "fig", "watermelon"],
  word => word.length
);
```

The selector function receives the current item and its return value is used for sorting.

### `direction`

An optional string that controls the sorting order.

Supported values:

```js
"asc"
"desc"
```

The default value is:

```js
"asc"
```

## Output

Returns a new sorted array.

The original input array is not sorted directly.

### Ascending order

```js
const users = [
  { name: "Sara", age: 28 },
  { name: "Ali", age: 22 },
  { name: "Ahmed", age: 31 }
];

sortBy(users, "age");
```

Output:

```js
[
  { name: "Ali", age: 22 },
  { name: "Sara", age: 28 },
  { name: "Ahmed", age: 31 }
]
```

### Descending order

```js
sortBy(users, "age", "desc");
```

Output:

```js
[
  { name: "Ahmed", age: 31 },
  { name: "Sara", age: 28 },
  { name: "Ali", age: 22 }
]
```

### Sorting with a function

```js
sortBy(
  ["pear", "fig", "watermelon"],
  word => word.length
);
```

Output:

```js
["fig", "pear", "watermelon"]
```

### Sorting numbers

```js
sortBy(
  [10, 3, 25, 7],
  number => number
);
```

Output:

```js
[3, 7, 10, 25]
```

### Empty array

```js
sortBy([], value => value);
```

Output:

```js
[]
```

## Null and Undefined Values

When the selected sorting value is `null` or `undefined`, that item is placed at the end of the result.

```js
sortBy(
  [
    { name: "Ali", score: 80 },
    { name: "Sara", score: null },
    { name: "Ahmed", score: 95 },
    { name: "Zara" }
  ],
  "score"
);
```

Output:

```js
[
  { name: "Ali", score: 80 },
  { name: "Ahmed", score: 95 },
  { name: "Sara", score: null },
  { name: "Zara" }
]
```

`null` and `undefined` values remain at the end in both ascending and descending order.

When both selected values are `null` or `undefined`, they are treated as equal by the comparison function.

## Original Array

The function creates a shallow copy before sorting:

```js
const result = [...values];
```

This means the order of the original array remains unchanged.

```js
const numbers = [3, 1, 2];
const sorted = sortBy(numbers, number => number);

console.log(numbers);
// [3, 1, 2]

console.log(sorted);
// [1, 2, 3]
```

The array is copied, but objects inside it are not cloned. The original and returned arrays still contain references to the same objects.

## Algorithm

The function works as follows:

1. Validate that `values` is an array.
2. Validate that `selector` is either a function or a string.
3. Validate that `direction` is either `"asc"` or `"desc"`.
4. Create a shallow copy of the input array.
5. Sort the copied array with a comparison function.
6. For each comparison:
   - obtain each sorting value by calling the selector function or reading the selected property;
   - treat two `null` or `undefined` values as equal;
   - place a single `null` or `undefined` value after a non-null value;
   - compare non-null values with `<` and `>`;
   - reverse the comparison result when the direction is `"desc"`.
7. Return the sorted copy.

## Validations

### Invalid `values`

A `TypeError` is thrown when `values` is not an array.

```js
sortBy("hello", value => value);
// TypeError: Values must be an array

sortBy({ age: 25 }, "age");
// TypeError: Values must be an array
```

### Invalid `selector`

A `TypeError` is thrown when `selector` is neither a function nor a string.

```js
sortBy([1, 2, 3], null);
// TypeError: Selector must be a function or string

sortBy([1, 2, 3], 2);
// TypeError: Selector must be a function or string
```

### Invalid `direction`

A `RangeError` is thrown when `direction` is not `"asc"` or `"desc"`.

```js
sortBy([3, 1, 2], value => value, "ascending");
// RangeError: Direction must be either "asc" or "desc"

sortBy([3, 1, 2], value => value, "ASC");
// RangeError: Direction must be either "asc" or "desc"
```

### Property access on `null` or `undefined`

When a string selector is used, each array item must support property access.

```js
sortBy(
  [{ age: 20 }, null],
  "age"
);
```

This causes JavaScript to throw a `TypeError` when the function attempts to evaluate:

```js
null["age"]
```

A function selector can safely handle such items.

```js
sortBy(
  [{ age: 20 }, null],
  item => item?.age
);
```

Output:

```js
[
  { age: 20 },
  null
]
```

## Comparison Behavior

The function compares selected values using JavaScript's `<` and `>` operators.

This works naturally for commonly comparable values such as:

- numbers;
- strings;
- dates;
- other values with meaningful primitive comparison behavior.

For predictable sorting, selector values should usually have the same type.

```js
sortBy(
  [
    { title: "Banana" },
    { title: "Apple" },
    { title: "Cherry" }
  ],
  "title"
);
```

Output:

```js
[
  { title: "Apple" },
  { title: "Banana" },
  { title: "Cherry" }
]
```

String comparison is case-sensitive and follows JavaScript's standard relational comparison rules. It is not locale-aware.

For locale-aware string ordering, this implementation would need support for a custom comparison function, such as one using `localeCompare`.

## Stable Ordering

When two selected values compare as equal, the comparison function returns `0`.

Modern JavaScript uses stable array sorting, so items with equal sorting values retain their original relative order.

```js
sortBy(
  [
    { name: "Ali", team: "A" },
    { name: "Sara", team: "B" },
    { name: "Ahmed", team: "A" }
  ],
  "team"
);
```

Output:

```js
[
  { name: "Ali", team: "A" },
  { name: "Ahmed", team: "A" },
  { name: "Sara", team: "B" }
]
```

## Running the Examples

Example cases are available in:

```text
/examples/sortBy.js
```

Run the example file from the project root:

```bash
node examples/sortBy.js
```

The project must support ES modules because `sortBy` is exported using the `export` keyword. One common setup is to include the following field in `package.json`:

```json
{
  "type": "module"
}
```