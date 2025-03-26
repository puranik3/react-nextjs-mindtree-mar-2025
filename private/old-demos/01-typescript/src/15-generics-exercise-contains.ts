// Generic contains function (built-in Array#includes)
function contains<T>(arr: T[] = [], queryvar: T): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === queryvar) {
            return true;
        }
    }
    return false;
}

let arr = [1, 2, 3, 4, 5, 6];

console.log(contains(arr, 3)); // true
console.log(contains(arr, 7)); // false

let names = ["John", "Jane", "Mark", "Mary"];
console.log(contains(names, "Jane")); // true
console.log(contains(names, "David")); // false

interface Person {
    name: string;
    age: number;
}

let john: Person = { name: "John", age: 32 };
let jane: Person = { name: "Jane", age: 28 };
let mark: Person = { name: "Mark", age: 40 };
let mary: Person = { name: "Mary", age: 44 };

let janeCopy: Person = { name: "Jane", age: 28 };

let employees = [john, jane, mark, mary];

console.log(contains(employees, jane)); // true
console.log(contains(employees, janeCopy)); // false

export {};
