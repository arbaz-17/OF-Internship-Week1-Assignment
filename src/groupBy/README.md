# `GroupBy Utility Function`

Group the items of an array by a property value or a selector function.

## Purpose

The `groupBy` function organizes array items into groups based on a calculated key.

The grouping key can be obtained in either of two ways:

- by providing a property name as a string;
- by providing a function that returns a key for each item.

The function:

- preserves the original order of items within each group;
- returns a new object containing the groups;
- does not modify the input array or its items.

## Function Signature

```js
groupBy(values, selector)
```

## Input

### `values`

An array containing the items to group.

```js
const users = [
  { name: "Ali", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ahmed", role: "admin" }
];
```

### `selector`

A string or function that determines the group key for each item.

#### Property-name selector

Provide a string to group objects by one of their properties.

```js
groupBy(users, "role");
```

For every item, the function reads:

```js
item[selector]
```

#### Function selector

Provide a function when the grouping key needs to be calculated.

```js
groupBy([1, 2, 3, 4, 5], number =>
  number % 2 === 0 ? "even" : "odd"
);
```

The selector function receives the current item and its return value is used as the group key.

## Output

Returns an object whose properties are the generated group keys. Each property contains an array of matching items.

### Grouping by a property

```js
const users = [
  { name: "Ali", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ahmed", role: "admin" }
];

groupBy(users, "role");
```

Output:

```js
{
  admin: [
    { name: "Ali", role: "admin" },
    { name: "Ahmed", role: "admin" }
  ],
  user: [
    { name: "Sara", role: "user" }
  ]
}
```

### Grouping with a function

```js
groupBy(
  [1, 2, 3, 4, 5],
  number => number % 2 === 0 ? "even" : "odd"
);
```

Output:

```js
{
  odd: [1, 3, 5],
  even: [2, 4]
}
```

### Grouping strings by length

```js
groupBy(
  ["cat", "tree", "sun", "cloud"],
  word => word.length
);
```

Output:

```js
{
  3: ["cat", "sun"],
  4: ["tree"],
  5: ["cloud"]
}
```

Object property names are displayed as strings, so numeric keys such as `3` become the property name `"3"`.

### Empty array

```js
groupBy([], "type");
```

Output:

```js
{}
```

### Missing properties

When a property-name selector does not exist on an item, its value is `undefined`. Such items are placed in the `"undefined"` group.

```js
groupBy(
  [
    { name: "Ali", team: "A" },
    { name: "Sara" }
  ],
  "team"
);
```

Output:

```js
{
  A: [{ name: "Ali", team: "A" }],
  undefined: [{ name: "Sara" }]
}
```

## Algorithm

The function works as follows:

1. Validate that `values` is an array.
2. Validate that `selector` is either a function or a string.
3. Create an empty result object.
4. Iterate over every item in `values`.
5. When using a string selector, ensure the current item is not `null` or `undefined`.
6. Determine the group key:
   - call `selector(item)` when the selector is a function;
   - read `item[selector]` when the selector is a string.
7. Check whether the result already contains an own property for that key.
8. Create an empty array when the group does not yet exist.
9. Add the current item to its group.
10. Return the completed result object.

## Validations

### Invalid `values`

A `TypeError` is thrown when `values` is not an array.

```js
groupBy("hello", "length");
// TypeError: Values must be an array

groupBy({ role: "admin" }, "role");
// TypeError: Values must be an array
```

### Invalid `selector`

A `TypeError` is thrown when `selector` is neither a function nor a string.

```js
groupBy([1, 2, 3], null);
// TypeError: Selector must be a function or string

groupBy([1, 2, 3], 2);
// TypeError: Selector must be a function or string
```

### Property access on `null` or `undefined`

When a string selector is used, a `TypeError` is thrown if an item is `null` or `undefined`.

```js
groupBy(
  [{ type: "A" }, null],
  "type"
);
// TypeError: Cannot access a property on null or undefined
```

This validation applies only to string selectors. A function selector receives the item directly and can decide how to handle `null` or `undefined`.

```js
groupBy(
  [null, { type: "A" }],
  item => item?.type ?? "unknown"
);
```

Output:

```js
{
  unknown: [null],
  A: [{ type: "A" }]
}
```

## Key Behavior

JavaScript object property-key rules apply to the generated group keys.

- Numbers and most other primitive values are converted to strings.
- Symbols remain symbol keys.
- Different object values normally become the same string key, `"[object Object]"`.
- Missing property values are grouped under `"undefined"`.

For predictable results, selector functions should generally return strings, numbers, or symbols.

Because the result is created with `{}`, special property names such as `"__proto__"` may behave unexpectedly. When arbitrary or untrusted keys must be supported, the implementation can use a null-prototype object:

```js
const result = Object.create(null);
```

## Running the Examples

Example cases are available in:

```text
/examples/groupBy.js
```

Run the example file from the project root:

```bash
node examples/groupBy.js
```

The project must support ES modules because `groupBy` is exported using the `export` keyword. One common setup is to include the following field in `package.json`:

```json
{
  "type": "module"
}
```