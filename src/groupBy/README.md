# Group By Utility

## Name

`groupBy`

## Purpose

The `groupBy` utility organizes the items of an array into groups based on a selected key.

The grouping key can be produced in two ways:

- by providing a string property name;
- by providing a selector function.

Each item is added to an array stored under its calculated group key. The original input array is not modified.

## Function Signature

```js
groupBy(values, selector)
```

## Parameters

### `values`

The array containing the items to group.

Only arrays are accepted. Passing any other value throws a `TypeError`.

### `selector`

Determines the key used to group each item.

The selector can be:

- a string representing a property name;
- a function that receives an item and returns a group key.

String selector:

```js
groupBy(users, "role");
```

Function selector:

```js
groupBy(numbers, (number) =>
  number % 2 === 0 ? "even" : "odd"
);
```

Passing any other selector type throws a `TypeError`.

## Output

Returns an object where:

- each property name represents a group key;
- each property value is an array containing the items assigned to that group.

### Group by property

```js
const users = [
  { name: "Ali", role: "developer" },
  { name: "Sara", role: "designer" },
  { name: "Ahmed", role: "developer" }
];

groupBy(users, "role");

// {
//   developer: [
//     { name: "Ali", role: "developer" },
//     { name: "Ahmed", role: "developer" }
//   ],
//   designer: [
//     { name: "Sara", role: "designer" }
//   ]
// }
```

### Group using a function selector

```js
groupBy([1, 2, 3, 4, 5], (number) =>
  number % 2 === 0 ? "even" : "odd"
);

// {
//   odd: [1, 3, 5],
//   even: [2, 4]
// }
```

The order of items inside each group matches their order in the original array.

## Missing Properties

When a string selector is used and an item does not contain the selected property, the selected value is `undefined`.

That item is grouped under the `"undefined"` key.


## Example File

A runnable example is available at:

```text
examples/groupBy.js
```


## Error Handling

The function throws a `TypeError` when `values` is not an array.

```js
groupBy("users", "role");

// TypeError: Values must be an array
```

The function throws a `TypeError` when `selector` is not a string or function.

```js
groupBy([], 123);

// TypeError: Selector must be a function or string
```

The function also throws a `TypeError` when a string selector is used with a `null` or `undefined` item.

```js
groupBy(
  [{ role: "developer" }, null],
  "role"
);

// TypeError: Cannot access a property on null or undefined
```

## Algorithm

1. Validate that `values` is an array.
2. Validate that `selector` is either a string or a function.
3. Create an empty result object.
4. Iterate through each item in the input array.
5. If a string selector is being used, ensure the current item is not `null` or `undefined`.
6. Determine the group key:
   - call the selector when it is a function;
   - access the selected property when it is a string.
7. Create an empty array for the group when the key has not been used before.
8. Add the current item to its group.
9. Return the completed result object.

## Implementation Notes

The function uses `Object.hasOwn()` to check whether a group already exists before creating it.

Each item is added to exactly one group. The function stores the original item references rather than cloning them.


## Limitations

- The top-level input must be an array.
- String selectors only support direct properties and do not support nested paths.
- Items stored in the groups are not cloned.

## Complexity

Let `n` be the number of items in the input array.

- Time complexity: `O(n)`
- Space complexity: `O(n)`

Each item is visited once and stored in one group.