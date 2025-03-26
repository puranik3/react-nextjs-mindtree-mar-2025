"use strict";
let arr = [1, 2, 3, 4, 5, 6];
// function add<T>() {
// }
const map = (arr, callback) => {
    const result = [];
    for (let i = 0; i < arr.length; ++i) {
        const square = callback(arr[i]);
        result.push(square);
    }
    return result;
};
const squaresArr = map(arr, (num) => num * num);
console.log(squaresArr);
const months = ["January", "February", "March", "April", "May", "June"];
// -> [7, 8, 5, 5, 3, 4]
const monthLengths = map(months, (m) => m.length);
console.log(monthLengths);
