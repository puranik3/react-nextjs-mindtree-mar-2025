// 2 ways for assigning function type
// 1. Function declaration
// The return value type is inferred
function add(x: number | string, y: number | string) /*: number*/ {
    let numX, numY;

    if (typeof x === "string") {
        numX = +x;
    } else {
        numX = x;
    }

    if (typeof y === "string") {
        numY = +y;
    } else {
        numY = y;
    }

    return numX + numY;
}

// 2. Function expression

// syntax same as function declaration
// const subtract = ( x : number, y : number ) /*: number*/ => x - y;

// new syntax
type BinaryFunction = (a: number, b: number) => number;
const subtract: BinaryFunction = (x, y) => x - y;
const multiply: BinaryFunction = (x, y) => x * y;

// when we have higher order functions, expression syntax (syntax 2) is useful
function ajax(url: string, callback: (response: string) => void) {
    // do something
}

ajax("https://api.example.com", (response) => {
    console.log(response);
    // return "ok";
});