# `Object Comparison Utility Function`

Compare two objects by their enumerable own properties and values.


## Purpose

The `objectComparision` function checks whether two objects contain:

- the same number of enumerable own string-keyed properties;
- the same property names;
- equal values for each property.

The function also treats two `NaN` values as equal.

## Function Signature

```js
objectComparision(objectA, objectB)
```

## Input

### `objectA`

The first object to compare.

### `objectB`

The second object to compare.

Both inputs must pass the utility's `isPlainObject` check:

```js
typeof value === "object" &&
value !== null &&
!Array.isArray(value)
```

Example:

```js
objectComparision(
  { name: "Ali", age: 25 },
  { name: "Ali", age: 25 }
);
```

## Output

Returns a boolean:

- `true` when both objects have matching enumerable own keys and equal values;
- `false` when their keys or values differ.

A `TypeError` is thrown when either top-level input does not pass the object validation.

## Examples

### Equal objects

```js
objectComparision(
  { name: "Ali", age: 25 },
  { name: "Ali", age: 25 }
);
```

Output:

```js
true
```

### Property order does not matter

```js
objectComparision(
  { name: "Ali", age: 25 },
  { age: 25, name: "Ali" }
);
```

Output:

```js
true
```

The function checks property names rather than relying on insertion order.

### Different values

```js
objectComparision(
  { name: "Ali", age: 25 },
  { name: "Ali", age: 30 }
);
```

Output:

```js
false
```

### Different property names

```js
objectComparision(
  { name: "Ali" },
  { username: "Ali" }
);
```

Output:

```js
false
```

### Different property counts

```js
objectComparision(
  { name: "Ali" },
  { name: "Ali", age: 25 }
);
```

Output:

```js
false
```

### `NaN` values

JavaScript normally considers `NaN !== NaN`. This utility handles that case explicitly.

```js
objectComparision(
  { score: NaN },
  { score: NaN }
);
```

Output:

```js
true
```

### Empty objects

```js
objectComparision({}, {});
```

Output:

```js
true
```

## Equality Behavior

### Primitive values

Primitive values are considered equal when strict equality succeeds:

```js
valueA === valueB
```

Examples:

```js
objectComparision(
  { active: true, count: 2 },
  { active: true, count: 2 }
);
// true
```

Different primitive types are not considered equal:

```js
objectComparision(
  { count: 2 },
  { count: "2" }
);
// false
```

### `NaN`

Two `NaN` values are treated as equal:

```js
Number.isNaN(valueA) && Number.isNaN(valueB)
```

### Arrays

Arrays are not compared by their contents.

They are equal only when both properties refer to the exact same array instance.

```js
const shared = [1, 2, 3];

objectComparision(
  { values: shared },
  { values: shared }
);
// true
```

Separate arrays with identical contents are not equal:

```js
objectComparision(
  { values: [1, 2, 3] },
  { values: [1, 2, 3] }
);
// false
```

### Functions

Functions are equal only when they are the same function reference.

```js
const handler = () => "done";

objectComparision(
  { handler },
  { handler }
);
// true
```

### `null` and `undefined`

Matching `null` or `undefined` property values are equal because strict equality succeeds.

```js
objectComparision(
  { value: null, other: undefined },
  { value: null, other: undefined }
);
// true
```

## Algorithm

The top-level comparison works as follows:

1. Validate that both inputs pass `isPlainObject`.
2. Read the enumerable own string keys of each object with `Object.keys`.
3. Return `false` when the objects have different key counts.
4. Iterate over every key from the first object.
5. Confirm that the second object owns the same key with `Object.hasOwn`.
6. Read the corresponding values from both objects.
7. Compare the values using `areValuesEqual`.
8. Return `false` as soon as a missing key or unequal value is found.
9. Return `true` when every key and value matches.

The value comparison helper:

1. Returns `true` for strict equality.
2. Returns `true` when both values are `NaN`.
3. Attempts a recursive object comparison when both values pass `isPlainObject`.
4. Returns `false` for all other unequal values.

## Validations

### Invalid first input

```js
objectComparision(null, {});
// TypeError: Both values must be plain objects

objectComparision([], {});
// TypeError: Both values must be plain objects
```

### Invalid second input

```js
objectComparision({}, "value");
// TypeError: Both values must be plain objects

objectComparision({}, undefined);
// TypeError: Both values must be plain objects
```

### Primitive top-level values

Primitive values are not valid top-level inputs.

```js
objectComparision(10, 10);
// TypeError: Both values must be plain objects
```


## Running the Examples

Example cases are expected in:

```text
/examples/objectComparision.js
```

Run the example file from the project root:

```bash
node examples/objectComparision.js
```

The project must support ES modules because `objectComparision` is exported using the `export` keyword. One common setup is to include the following field in `package.json`:

```json
{
  "type": "module"
}
```