function isPlainObject(value) {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function deepEqual(valueA, valueB) {
    if (valueA === valueB) {
        return true;
    }

    if (!isPlainObject(valueA) || !isPlainObject(valueB)) {
        return false;
    }

    const keysA = Object.keys(valueA);
    const keysB = Object.keys(valueB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    return keysA.every((key) => {
        return (
            Object.hasOwn(valueB, key) &&
            deepEqual(valueA[key], valueB[key])
        );
    });
}

function unique(values) {
    const result = [];

    for (const item of values) {
        const alreadyExists = result.some((existingItem) =>
            deepEqual(item, existingItem)
        );

        if (!alreadyExists) {
            result.push(item);
        }
    }

    return result;
}


const mixedTest = [
    1,
    "1",
    true,
    null,
    undefined,

    1,
    "1",
    true,
    null,
    undefined,

    { id: 1, name: "Ali" },
    { id: 1, name: "Ali" },

    { name: "Ali", id: 1 }, // same content, different key order

    { id: 2, name: "Ahmed" },

    { user: { id: 1, name: "Ali" } },
    { user: { id: 1, name: "Ali" } },

    { user: { id: 2, name: "Ahmed" } }
];


console.log("Unique: ",unique(mixedTest));