# Deep Clone Utility

## Name

`deepClone`

## Purpose

The `deepClone` utility creates an independent copy of a supported JavaScript value.

It recursively clones nested arrays and plain objects so that changes made to the cloned structure do not affect the original structure.

Primitive values are returned directly because they are copied by value and do not contain nested references.

## Function Signature

```js
deepClone(value)
```

## Parameters

### `value`

The value to clone.

Supported values include:

- primitive values;
- arrays;
- plain objects;
- nested combinations of arrays and plain objects.

## Output

Returns a cloned version of the provided value.

### Clone a plain object

```js
const user = {
  name: "Ali",
  address: {
    city: "Lahore"
  }
};

const clonedUser = deepClone(user);

clonedUser.address.city = "Karachi";

console.log(user.address.city);
// "Lahore"
```

The nested `address` object is cloned, so changing the clone does not affect the original object.

### Clone an array

```js
const values = [
  1,
  [2, 3],
  { active: true }
];

const clonedValues = deepClone(values);

console.log(clonedValues);
// [1, [2, 3], { active: true }]
```

The outer array, nested array, and nested plain object are all newly created values.

### Clone a primitive

```js
deepClone("hello");
// "hello"

deepClone(42);
// 42

deepClone(null);
// null
```

Primitive values are returned unchanged because they do not need recursive cloning.

## Example File

A runnable example is available at:

```text
examples/deepClone.js
```

## Error Handling

The function throws a `TypeError` when it receives an unsupported object type.

```js
deepClone(new Date());

// TypeError:
// deepClone only supports primitives, arrays, and plain objects
```

## Algorithm

1. Check whether the value is `null` or not an object.
2. If it is a primitive value, return it directly.
3. If the value is an array:
   - create a new array;
   - recursively clone every item;
   - return the cloned array.
4. If the value is a plain object:
   - create a new object;
   - iterate through its own enumerable string keys;
   - recursively clone every property value;
   - assign each cloned value to the new object.
5. If the value is another object type, throw a `TypeError`.

## Implementation Notes

The utility uses recursion to process nested structures.

Arrays are cloned with `map()`, while plain objects are cloned by iterating through `Object.keys()`.

The `isPlainObject` helper is used to distinguish ordinary object literals from special object types such as `Date`, `Map`, `Set`, and class instances.


## Limitations

- Only primitives, arrays, and plain objects are supported.
- Special object types such as `Date`, `Map`, `Set`, `RegExp`, and class instances are not cloned.

## Complexity

Let `n` be the total number of visited array items and object properties, and let `d` be the maximum nesting depth.

- Time complexity: `O(n)`
- Cloned result space: `O(n)`
- Call-stack space: `O(d)`

Each supported value is visited once and copied into the cloned structure.