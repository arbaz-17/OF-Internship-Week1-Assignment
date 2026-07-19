 Object Transformation Utility

## Name

`transformObject`

## Purpose

The `transformObject` utility creates a new object by recursively applying a transformer function to each leaf value.

It preserves the original object structure and property names while allowing nested values to be changed.

The utility supports:

- nested plain objects;
- nested arrays;
- primitive values;
- other non-plain values treated as leaf values.


## Function Signature

```js
transformObject(object, transformer)
```

## Parameters

### `object`

The plain object to transform.

The top-level input must be a plain object. Passing an array, primitive value, `null`, or another special object type throws a `TypeError`.

### `transformer`

A function that receives each leaf value and its key or array index.

```js
transformer(value, key)
```

For object properties, `key` is the property name.

For array elements, `key` is the numeric index.

The transformer must return the value that should be stored in the transformed result.

## Output

Returns a new object with the same structure as the input, but with each leaf value replaced by the transformer result.

### Transform numeric values

```js
const data = {
  name: "Ali",
  age: 25,
  scores: [10, 20],
  address: {
    city: "Lahore"
  }
};

transformObject(data, (value) =>
  typeof value === "number"
    ? value * 2
    : value
);

// {
//   name: "Ali",
//   age: 50,
//   scores: [20, 40],
//   address: {
//     city: "Lahore"
//   }
// }
```

### Transform using property keys

```js
transformObject(
  {
    firstName: "ali",
    city: "lahore"
  },
  (value, key) =>
    key === "firstName"
      ? value.toUpperCase()
      : value
);

// {
//   firstName: "ALI",
//   city: "lahore"
// }
```

### Transform values inside arrays

```js
transformObject(
  {
    values: [10, 20, 30]
  },
  (value, index) =>
    typeof index === "number"
      ? value + index
      : value
);

// {
//   values: [10, 21, 32]
// }
```

## Example File

A runnable example is available at:

```text
examples/transformObject.js
```


## Algorithm

1. Validate that the top-level input is a plain object.
2. Validate that `transformer` is a function.
3. Pass the object to a recursive helper named `transformValue`.
4. When the current value is an array:
   - create a new array;
   - recursively process each item;
   - pass the array index as the key.
5. When the current value is a plain object:
   - create a new result object;
   - iterate through its own enumerable string keys;
   - recursively process each property value.
6. When the current value is neither an array nor a plain object:
   - call the transformer with the value and its key or index.
7. Return the completed transformed object.

## Implementation Notes

The utility transforms leaf values rather than object keys.

Nested arrays and plain objects are recreated.

Values that are not arrays or plain objects are passed directly to the transformer. This includes primitives and special object types such as `Date`, `Map`, or class instances.

The value returned by the transformer is stored directly and is not processed recursively again.

## Limitations

- The top-level input must be a plain object.
- Object property names are preserved and cannot be renamed by the transformer.
- Properties cannot be removed automatically; the transformer can only return a replacement value.
- Objects returned by the transformer are not recursively transformed.

## Complexity

Let `n` be the total number of visited object properties and array elements, and let `d` be the maximum nesting depth.

- Time complexity: `O(n)`
- Result space complexity: `O(n)`

Each visited property or array element is processed once.