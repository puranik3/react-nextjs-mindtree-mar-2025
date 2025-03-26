"use strict";
const myMap = (arr, callback) => {
    // type assertion "as"
    const result = [];
    for (let i = 0; i < arr.length; ++i) {
        const num = callback(arr[i]);
        result.push(num);
    }
    return result;
};
let result;
const arr = [1, 2, 3, 4, 5, 6];
result = myMap(arr, (item) => item * item);
console.log(result);
const days = ["Sunday", "Monday", "Tuesday", "Wednesday"];
result = myMap(days, (day) => day.length);
console.log(result);
