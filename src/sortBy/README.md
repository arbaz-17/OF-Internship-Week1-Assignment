# Sort By Utility

## Name

`sortBy`

## Purpose

The `sortBy` utility returns a new array sorted according to a selected value.

The selected value can be obtained in two ways:

- by providing a string property name;
- by providing a selector function.

The utility supports ascending and descending order. It creates a copy of the input before sorting, so the original array is not modified.

## Function Signature

```js
sortBy(values, selector, direction = "asc")
```

## Parameters

### `values`

The array to sort.

Only arrays are accepted. Passing any other value throws a `TypeError`.

### `selector`

Determines which value should be used when comparing each item.

The selector can be:

- a string representing a property name;
- a function that receives an item and returns its sortable value.

String selector:

```js
sortBy(users, "age");
```

Function selector:

```js
sortBy(users, (user) => user.name.length);
```

Passing any other selector type throws a `TypeError`.


## Output

Returns a new sorted array.

The original array remains unchanged.

### Sort by property

```js
const users = [
  { name: "Ali", age: 28 },
  { name: "Sara", age: 22 },
  { name: "Ahmed", age: 25 }
];

sortBy(users, "age");

// [
//   { name: "Sara", age: 22 },
//   { name: "Ahmed", age: 25 },
//   { name: "Ali", age: 28 }
// ]
```

### Function selector

```js
sortBy(users, (user) => user.name.length);

// [
//   { name: "Ali", age: 28 },
//   { name: "Sara", age: 22 },
//   { name: "Ahmed", age: 25 }
// ]
```

## Nullish Values

Selected values equal to `null` or `undefined` are placed at the end of the result in both ascending and descending order.
When a string selector is used, `null` or `undefined` items are treated as having an `undefined` selected value and are also placed at the end.

## Example File

A runnable example is available at:

```text
examples/sortBy.js
```

## Error Handling

The function throws a `TypeError` when `values` is not an array.

```js
sortBy("users", "age");

// TypeError: Values must be an array
```

The function throws a `TypeError` when `selector` is not a string or function.

```js
sortBy([], 123);

// TypeError: Selector must be a function or string
```

The function throws a `RangeError` when `direction` is not `"asc"` or `"desc"`.

```js
sortBy([], "age", "ascending");

// RangeError: Direction must be either "asc" or "desc"
```

## Algorithm

1. Validate that `values` is an array.
2. Validate that `selector` is either a string or a function.
3. Validate that `direction` is either `"asc"` or `"desc"`.
4. Create a shallow copy of the input array.
5. Sort the copied array using a comparison function.
6. For each comparison:
   - obtain each selected value using the selector function or property name;
   - place nullish selected values after defined values;
   - compare the two selected values using `<` and `>`;
   - reverse the comparison result when the direction is `"desc"`.
7. Return the sorted copy.

## Implementation Notes

The utility uses the native `Array.prototype.sort()` method for rearranging values.

The custom comparison function is responsible for:

- extracting the selected values;
- handling missing values;
- supporting ascending and descending order;
- returning the correct comparison result.

A shallow copy is created with spread syntax before sorting because the native `sort()` method mutates the array on which it is called.

## Limitations

- The selector should return consistently comparable values, such as all numbers, strings, or dates.
- Mixed value types may be affected by JavaScript coercion during `<` and `>` comparisons.

## Complexity

Let `n` be the number of items in the input array.

- Copying the input array: `O(n)`
- Typical sorting time: `O(n log n)`
- Returned array space: `O(n)`