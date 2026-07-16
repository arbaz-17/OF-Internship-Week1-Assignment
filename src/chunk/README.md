# `Chunk Utility Function`

Split a string or an array into smaller arrays of a specified maximum size.

## Purpose

The `chunk` function divides an input collection into sequential chunks.

- Each chunk contains at most `size` items.
- The original item order is preserved.
- The final chunk may contain fewer items when the input length is not evenly divisible by `size`.
- The input value is not modified.

## Function Signature

```js
chunk(values, size)
```

## Input

### `values`

A string or an array to divide into chunks.

```js
chunk([1, 2, 3, 4], 2);
chunk("hello", 2);
```

When a string is provided, it is iterated character by character. Therefore, the returned chunks are arrays of characters rather than strings.

### `size`

A positive integer specifying the maximum number of items in each chunk.

Valid examples:

```js
1
2
5
```

Invalid examples:

```js
0
-1
1.5
"2"
```

## Output

Returns an array containing the generated chunks.

### Array input

```js
chunk([1, 2, 3, 4, 5], 2);
```

Output:

```js
[
  [1, 2],
  [3, 4],
  [5]
]
```

### String input

```js
chunk("hello", 2);
```

Output:

```js
[
  ["h", "e"],
  ["l", "l"],
  ["o"]
]
```

### Empty input

```js
chunk([], 3);
// []

chunk("", 3);
// []
```

## Algorithm

The function works as follows:

1. Validate that `values` is either a string or an array.
2. Validate that `size` is a positive integer.
3. Create an empty result array and an empty current chunk.
4. Iterate over each item in `values`.
5. Add the item to the current chunk.
6. When the current chunk reaches `size`, add it to the result and start a new chunk.
7. After iteration, add the final partially filled chunk when it is not empty.
8. Return the result.

## Validations

The function performs two validations.

### Invalid `values`

A `TypeError` is thrown when `values` is neither a string nor an array.

```js
chunk(123, 2);
// TypeError: Input must be a string or an array.

chunk({ a: 1 }, 2);
// TypeError: Input must be a string or an array.
```

### Invalid `size`

A `RangeError` is thrown when `size` is not an integer greater than `0`.

```js
chunk([1, 2, 3], 0);
// RangeError: Size must be an integer greater than 0

chunk([1, 2, 3], 1.5);
// RangeError: Size must be an integer greater than 0
```

## Running the Examples

Example cases are available in:

```text
/examples/chunk.js
```

Run the file from the project root:

```bash
node examples/chunk.js
```

The project must be configured to support ES modules because `chunk` is exported with the `export` keyword. One common configuration is to include the following setting in `package.json`:

```json
{
  "type": "module"
}
```
