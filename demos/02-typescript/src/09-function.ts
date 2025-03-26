import type { NS } from "./05-type-alias";

// Syntax #1 for data typing functions
// 1, 2 -> 3
// "1", "2" -> 1, 2 -> 3
function add(x: NS, y: NS) {
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

const subtract = (x: number, y: number) => x - y;

// Syntax #2 - applies only to function expression
type BinaryFunction = (x: number, y: number) => number;

const multiply: BinaryFunction = function (x, y) {
    return x - y;
};

const divide: BinaryFunction = (x, y) => x / y;

// When we pass function as an argument to another function, Syntax #2 will be helpful
// void in TS means the function is not expected to return something - it is returns fine, if it does not return fine.
type CallbackFunction = (response: string) => void;

function ajax(url: string, callback: CallbackFunction) {}

ajax(
    "https://workshops-server.onrender.com/workshops",
    function (response: string) {
        console.log(response);

        // return 100; // if we return also, it is fine
    }
);

export {};
