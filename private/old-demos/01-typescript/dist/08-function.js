"use strict";
// 2 ways for assigning function type
// 1. Function declaration
// The return value type is inferred
function add(x, y) {
    let numX, numY;
    if (typeof x === "string") {
        numX = +x;
    }
    else {
        numX = x;
    }
    if (typeof y === "string") {
        numY = +y;
    }
    else {
        numY = y;
    }
    return numX + numY;
}
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
// when we have higher order functions, expression syntax (syntax 2) is useful
function ajax(url, callback) {
    // do something
}
ajax("https://api.example.com", (response) => {
    console.log(response);
    // return "ok";
});
