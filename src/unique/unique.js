export function unique(values) {
  
  if (!Array.isArray(values)) {
    throw new TypeError("Values must be an array");
  }

  const result = [];

  for (const item of values) {
    let alreadyExists = false;

    for (const existingItem of result) {
      if (
        item === existingItem ||
        (Number.isNaN(item) && Number.isNaN(existingItem))
      ) {
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      result.push(item);
    }
  }

  return result;
}