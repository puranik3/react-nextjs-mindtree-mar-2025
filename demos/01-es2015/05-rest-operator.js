// ... (rest operator)

// 1. with the last argument of a function
const sum = (x, y, ...z) => {
    console.log(x);
    console.log(y);
    console.log(z);

    return x + y;
};

console.log(sum(12, 13, 14, 15, 16)); // x = 12, y = 13, z = [ 14, 15, 16 ]

const sumAll = (...args) => {
    let result = 0;

    for (let i = 0; i < args.length; i++) {
        result = result + args[i];
    }

    return result;
}

console.log(sumAll(12, 13, 14, 15, 16));