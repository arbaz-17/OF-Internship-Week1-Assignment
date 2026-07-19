# Object Comparison Utility

## Name

`objectComparison`

## Purpose

The `objectComparison` utility checks whether two plain objects are deeply equal.

It compares:

- own enumerable string properties;
- primitive values;
- nested plain objects;
- nested arrays;
- objects stored inside arrays;
- arrays stored inside objects.


## Function Signature

```js
objectComparison(objectA, objectB)
```

## Parameters

### `objectA`

The first plain object to compare.

### `objectB`

The second plain object to compare.

Both top-level values must be plain objects. Passing arrays, `null`, special object types, or primitive values throws a `TypeError`.


## Output

Returns a boolean:

- `true` when both objects have the same keys and deeply equal values;
- `false` when their keys, values, array contents, or nested structures differ.

### Equal objects

```js
objectComparison(
  {
    name: "Ali",
    age: 25
  },
  {
    age: 25,
    name: "Ali"
  }
);

// true
```

Property order does not matter.

### Nested objects and arrays

```js
objectComparison(
  {
    user: {
      name: "Ali",
      skills: ["JavaScript", "CSS"]
    }
  },
  {
    user: {
      name: "Ali",
      skills: ["JavaScript", "CSS"]
    }
  }
);

// true
```

### Different values

```js
objectComparison(
  {
    name: "Ali",
    active: true
  },
  {
    name: "Ali",
    active: false
  }
);

// false
```

### Array order

```js
objectComparison(
  { values: [1, 2, 3] },
  { values: [3, 2, 1] }
);

// false
```

## Example File

A runnable example is available at:

```text
examples/objectComparison.js
```

## Algorithm

The utility uses three cooperating functions:

- `objectComparison` compares plain objects;
- `areArraysEqual` compares arrays;
- `areValuesEqual` decides how individual values should be compared.

Steps:

1. Validate that both top-level values are plain objects.
2. Collect the own enumerable string keys of both objects.
3. Return `false` if the objects have different numbers of keys.
4. Iterate through every key in the first object.
5. Check that the second object owns the same key.
6. Compare the two property values:
   - use strict equality for identical primitive values or references;
   - treat two `NaN` values as equal;
   - compare arrays recursively by length and position;
   - compare nested plain objects recursively;
   - otherwise return `false`.
7. Return `true` after every key and value passes comparison.

## Implementation Notes

The function uses `Object.hasOwn()` to confirm that a key belongs directly to the second object rather than being inherited.

Comparing key counts before checking individual keys prevents objects with missing or additional properties from being considered equal.

Arrays are compared element by element. Nested arrays and plain objects can be combined to any practical depth.


## Limitations

- Both top-level inputs must be plain objects.
- Non-enumerable properties are ignored.
- Two plain objects with different allowed prototypes may be considered equal when their enumerable contents match.
- Special object types such as `Date`, `Map`, `Set`, `RegExp`, and class instances are not compared structurally.

## Complexity

Let `n` be the total number of visited object properties and array elements, and let `d` be the maximum nesting depth.

- Time complexity: `O(n)`
- Call-stack space: `O(d)`
