type MapCallback<T, U> = (item: T) => U;

// function add<T>() {

// }

const map = <T, U>(arr: T[], callback: MapCallback<T, U>) => {
    const result: U[] = [];

    for (let i = 0; i < arr.length; ++i) {
        const square = callback(arr[i]);
        result.push(square);
    }

    return result;
};

let arr = [1, 2, 3, 4, 5, 6];

const squaresArr = map(arr, (num) => num * num);

console.log(squaresArr);

const months = ["January", "February", "March", "April", "May", "June"];

// -> [7, 8, 5, 5, 3, 4]
const monthLengths = map(months, (m) => m.length);
console.log(monthLengths);
