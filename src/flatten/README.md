# Flatten Utility

## Name

`flatten`

## Purpose

The `flatten` utility reduces the nesting level of an array by moving nested values into a new result array.

By default, it flattens one level. A custom depth can be provided to control how many nested levels are removed. Passing `Infinity` completely flattens all supported nested arrays.

The original array is not modified.

## Function Signature

```js
flatten(values, depth = 1)
```

## Parameters

### `values`

The array to flatten.

Only arrays are accepted. Passing any other value throws a `TypeError`.

### `depth`

A non-negative integer that determines how many nesting levels should be removed.

The default value is `1`.

Supported depth values include:

- `0` — returns a shallow copy without flattening nested arrays
- Positive integers — flatten up to the specified number of levels
- `Infinity` — flatten all nested levels

Negative numbers, decimals, strings, `NaN`, and `-Infinity` throw a `RangeError`.

## Output

Returns a new array containing the flattened values.

### Default depth

```js
flatten([1, [2, 3], [4, [5]]]);

// [1, 2, 3, 4, [5]]
```

### Custom depth

```js
flatten([1, [2, [3, [4]]]], 2);

// [1, 2, 3, [4]]
```

### Complete flattening

```js
flatten([1, [2, [3, [4]]]], Infinity);

// [1, 2, 3, 4]
```


## Example File

A runnable example is available at:

```text
examples/flatten.js
```


## Error Handling

The function throws a `TypeError` when `values` is not an array.

```js
flatten("hello");

// TypeError: Values must be an array
```

The function throws a `RangeError` when `depth` is not a non-negative integer or `Infinity`.

```js
flatten([1, [2]], -1);

// RangeError: Depth must be a non-negative integer or Infinity
```

## Implementation Notes

The utility uses a recursive helper function named `flattenInto`.

For each item:

1. If the item is an array and the remaining depth is greater than `0`, the helper processes that array recursively.
2. Otherwise, the item is added directly to the result.
3. The depth is reduced only when a nested array is entered.

The result array is created separately, so the original array is not mutated.

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

## Limitations

- Only arrays are accepted as the top-level input.
- The function does not clone objects or other reference values inside the array.

## Complexity

Let `n` be the total number of values visited within the requested depth, and let `d` be the maximum recursion depth reached.

- Time complexity: `O(n)`
- Result space complexity: `O(n)`
- Call-stack space: `O(d)`

Each visited value is processed once and added to the result at most once.