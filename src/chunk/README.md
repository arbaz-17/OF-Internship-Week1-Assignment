# Chunk Utility

## Name

`chunk`

## Purpose

The `chunk` utility divides an array or string into smaller groups of a specified size.

It processes the input from left to right and adds each value to the current chunk. When the chunk reaches the requested size, it is added to the result. If any values remain at the end, they are returned as a smaller final chunk.

The function does not modify the original input.

## Function Signature

```js
chunk(values, size)
```

## Parameters

### `values`

The data to divide into chunks.

Supported input types:

- Array
- String

Passing any other type throws a `TypeError`.

### `size`

A positive integer that defines the maximum number of items in each chunk.

The value must be greater than `0`. Invalid values such as `0`, negative numbers, decimals, strings, `NaN`, and `Infinity` throw a `RangeError`.

## Output

Returns a new array containing the generated chunks.

For an array input, each chunk is an array of values.

```js
chunk([1, 2, 3, 4, 5], 2);

// [[1, 2], [3, 4], [5]]
```

For a string input, each chunk is returned as an array of characters.

```js
chunk("hello", 2);

// [["h", "e"], ["l", "l"], ["o"]]
```

If the input is empty, the function returns an empty array.

```js
chunk([], 3);
// []

chunk("", 3);
// []
```

## Example File

A runnable example is available at:

```text
examples/chunk.js
```

## Error Handling

The function throws a `TypeError` when the input is not an array or string.

```js
chunk({ value: 1 }, 2);
// TypeError: Input must be a string or an array.
```

The function throws a `RangeError` when the chunk size is not a positive integer.

```js
chunk([1, 2, 3], 0);
// RangeError: Size must be an integer greater than 0
```

## Implementation Notes

The utility uses a loop to build each chunk manually instead of relying on methods such as `slice()` or `reduce()`.

A new result array and new chunk arrays are created, so the original array is not mutated. However, objects or arrays stored inside the input are copied by reference rather than deeply cloned.

## Limitations

- Only arrays and strings are supported.
- Values stored inside an input array are not cloned.

## Complexity

Let `n` be the number of values or characters in the input.

- Time complexity: `O(n)`
- Space complexity: `O(n)`

Each input item is visited once and stored once in the returned chunked array.