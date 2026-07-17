# `Deep Clone Utility Function`

Create a recursive copy of primitives, arrays, and object properties.

## Purpose

The `deepClone` function creates a new value by recursively copying nested arrays and objects.

The function:

- returns primitive values unchanged;
- creates new arrays;
- creates new objects;
- recursively clones nested array elements and object properties;
- preserves the order of array elements;
- does not modify the original value.

## Function Signature

```js
deepClone(value)
```

## Input

### `value`

The value to clone.

The implementation directly supports:

- primitive values;
- arrays;
- non-null objects that are not arrays.

Examples:

```js
deepClone(10);
deepClone("hello");
deepClone([1, 2, 3]);
deepClone({ name: "Ali" });
```

## Output

Returns a cloned version of the supplied value.

The exact behavior depends on the input type.

### Primitive values

Primitive values are returned directly.

```js
deepClone(42);
// 42

deepClone("hello");
// "hello"

deepClone(true);
// true

deepClone(null);
// null
```

Primitive values do not require a separate copy because they are immutable values rather than mutable object references.

### Arrays

A new array is created, and every item is cloned recursively.

```js
const original = [
  1,
  [2, 3],
  { name: "Ali" }
];

const clone = deepClone(original);
```

Result:

```js
[
  1,
  [2, 3],
  { name: "Ali" }
]
```

The outer array, nested array, and nested object are all new references.

### Objects

A new object is created, and every enumerable own string-keyed property is cloned recursively.

```js
const original = {
  user: {
    name: "Sara",
    preferences: {
      theme: "dark"
    }
  }
};

const clone = deepClone(original);
```

Result:

```js
{
  user: {
    name: "Sara",
    preferences: {
      theme: "dark"
    }
  }
}
```

## Reference Independence

Changes made to the clone do not affect the corresponding nested arrays or objects in the original value.

```js
const original = {
  user: {
    name: "Ali"
  },
  tags: ["admin", "editor"]
};

const clone = deepClone(original);

clone.user.name = "Sara";
clone.tags.push("author");

console.log(original);
```

Output:

```js
{
  user: {
    name: "Ali"
  },
  tags: ["admin", "editor"]
}
```

The original remains unchanged because the nested object and array were recursively copied.

## Algorithm

The function uses recursion and works as follows:

1. Check whether the value is `null` or is not an object.
2. Return such values directly.
3. When the value is an array:
   - create a new array with `map`;
   - recursively clone every array item.
4. When the value is a non-null object that is not an array:
   - create an empty object;
   - obtain its enumerable own string keys with `Object.keys`;
   - recursively clone each corresponding property value;
   - assign each cloned value to the new object.
5. Return the completed clone.

## Helper Function

The implementation includes an `isPlainObject` helper:

```js
function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}
```

Despite its name, this check does not verify that an object is a true plain object.

It returns `true` for any non-null, non-array object, including values such as:

```js
new Date()
new Map()
new Set()
/pattern/
```

This affects the limitations described below.

## Validation and Errors

The function contains the following error:

```js
throw new TypeError(
  "deepClone only supports primitives, arrays, and plain objects"
);
```

With the current `isPlainObject` implementation, this error is normally unreachable.

Every JavaScript value falls into one of these paths:

- `null` or a non-object value is returned directly;
- an array is cloned with `map`;
- every other object passes `isPlainObject`.

As a result, unsupported object types are generally converted into ordinary objects rather than causing the documented `TypeError`.

## Limitations

### Special object types are not preserved

Objects such as `Date`, `Map`, `Set`, and `RegExp` are not cloned according to their original types.

```js
const original = {
  createdAt: new Date("2025-01-01")
};

const clone = deepClone(original);
```

The `Date` object has no enumerable own string properties, so the cloned value becomes:

```js
{
  createdAt: {}
}
```

Similar behavior applies to many built-in object types.


## Examples

### Nested object and array

```js
const original = {
  id: 1,
  profile: {
    name: "Sara",
    skills: ["JavaScript", "Node.js"]
  }
};

const clone = deepClone(original);

console.log(clone);
```

Output:

```js
{
  id: 1,
  profile: {
    name: "Sara",
    skills: ["JavaScript", "Node.js"]
  }
}
```

Reference checks:

```js
clone !== original;
// true

clone.profile !== original.profile;
// true

clone.profile.skills !== original.profile.skills;
// true
```

### Empty values

```js
deepClone([]);
// []

deepClone({});
// {}
```

### Mixed values

```js
deepClone({
  number: 10,
  text: "hello",
  active: true,
  missing: undefined,
  nested: [null, { value: 5 }]
});
```

Output:

```js
{
  number: 10,
  text: "hello",
  active: true,
  missing: undefined,
  nested: [null, { value: 5 }]
}
```

## Running the Examples

Example cases are available in:

```text
/examples/deepClone.js
```

Run the example file from the project root:

```bash
node examples/deepClone.js
```

The project must support ES modules because `deepClone` is exported using the `export` keyword. One common setup is to include the following field in `package.json`:

```json
{
  "type": "module"
}
```