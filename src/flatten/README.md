# `Flatten Utility Function`

Flatten nested arrays to a specified depth.

## Purpose

The `flatten` function creates a new array by replacing nested arrays with their elements up to a specified depth.

- The default flattening depth is `1`.
- A depth of `0` keeps nested arrays unchanged.
- A depth of `Infinity` flattens all nested arrays.
- The original array is not modified.
- The order of values is preserved.

## Function Signature

```js
flatten(values, depth = 1)
```

## Input

### `values`

The array to flatten. It may contain values, nested arrays, or both.

```js
flatten([1, [2, 3], 4]);
flatten([1, [2, [3, 4]]], 2);
```

### `depth`

An optional non-negative integer that specifies how many nested array levels should be flattened.

The default value is `1`.

Valid depth values include:

```js
0
1
2
Infinity
```

Invalid depth values include:

```js
-1
1.5
"2"
NaN
```

## Output

Returns a new array containing the flattened values.

### Default depth

When `depth` is omitted, one nested level is flattened.

```js
flatten([1, [2, 3], [4, [5]]]);
```

Output:

```js
[1, 2, 3, 4, [5]]
```

### Custom depth

```js
flatten([1, [2, [3, [4]]]], 2);
```

Output:

```js
[1, 2, 3, [4]]
```

### Depth of zero

A depth of `0` does not flatten nested arrays. The function still returns a new top-level array.

```js
flatten([1, [2, 3]], 0);
```

Output:

```js
[1, [2, 3]]
```

### Infinite depth

Use `Infinity` to flatten every nested array level.

```js
flatten([1, [2, [3, [4, [5]]]]], Infinity);
```

Output:

```js
[1, 2, 3, 4, 5]
```

### Empty array

```js
flatten([]);
```

Output:

```js
[]
```

## Algorithm

The function uses a recursive helper named `flattenInto`.

1. Validate that `values` is an array.
2. Validate that `depth` is either:
   - a non-negative integer, or
   - `Infinity`.
3. Create an empty result array.
4. Iterate over each item in the current array.
5. When an item is an array and the remaining depth is greater than `0`:
   - decrease the remaining depth by `1`, or keep it as `Infinity`;
   - recursively process the nested array.
6. Otherwise, add the item directly to the result.
7. Return the completed result array.

## Validations

### Invalid `values`

A `TypeError` is thrown when `values` is not an array.

```js
flatten("hello");
// TypeError: Values must be an array

flatten({ value: 1 });
// TypeError: Values must be an array
```

### Invalid `depth`

A `RangeError` is thrown when `depth` is not a non-negative integer or `Infinity`.

```js
flatten([1, [2]], -1);
// RangeError: Depth must be a non-negative integer or Infinity

flatten([1, [2]], 1.5);
// RangeError: Depth must be a non-negative integer or Infinity

flatten([1, [2]], "2");
// RangeError: Depth must be a non-negative integer or Infinity
```

## Running the Examples

Example cases are available in:

```text
/examples/flatten.js
```

Run the example file from the project root:

```bash
node examples/flatten.js
```

The project must support ES modules because `flatten` is exported using the `export` keyword. One common setup is to include the following field in `package.json`:

```json
{
  "type": "module"
}
```

