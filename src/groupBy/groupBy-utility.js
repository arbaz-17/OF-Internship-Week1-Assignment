function groupBy(values, property) {
    const result = {};

    for (const item of values) {
        const groupKey = item[property];

        if (!result[groupKey]) {
            result[groupKey]=[]
        }

        result[groupKey].push(item)
    }

    return result;
}


const users = [
    { name: "Ali", role: "developer" },
    { name: "Sara", role: "designer" },
    { name: "Ahmed", role: "developer" }
];

console.log(groupBy(users, "role"));