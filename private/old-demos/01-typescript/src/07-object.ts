type Person = {
    name: string;
    readonly age: number;
    spouse?: string;
};

let john: Person;

// age is readonly and after john is assigned, it cannot be changed
john = {
    name: "John",
    age: 32,
    spouse: "Jane",
};

// error - age is readonly
// john.age++;
// john.age = 40;

let jane: Person = {
    name: "Jane",
    age: 28,
};

// #2: Excess property check kicks in when assigning an object literal to a variable of an object type
let x = {
    name: 'Papa John',
    age: 64,
    children: ['John' ]
};

let papaJohn : Person = x;

// error - excess property check done
// let mamaJohn : Person = {
//     name: 'Mama John',
//     age: 60,
//     children: ['John' ]
// }