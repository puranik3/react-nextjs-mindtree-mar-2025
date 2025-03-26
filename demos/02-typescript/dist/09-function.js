"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Syntax #1 for data typing functions
// 1, 2 -> 3
// "1", "2" -> 1, 2 -> 3
function add(x, y) {
    // type narrowing
    console.log(x); // x is NS
    // TS will "narrow" the type of x and y due to the check we do
    if (typeof x === "number" && typeof y === "number") {
        return x + y; // x, y are numbers
    }
    if (typeof x === "string" || typeof y === "string") {
        // +"1" -> 1
        return +x + +y;
    }
    return 0; // just to satisy TS - this is actually inreachable code
}
const subtract = (x, y) => x - y;
const multiply = function (x, y) {
    return x - y;
};
const divide = (x, y) => x / y;
function ajax(url, callback) { }
ajax("https://workshops-server.onrender.com/workshops", function (response) {
    console.log(response);
    // return 100; // if we return also, it is fine
});
