"use strict";
let john;
// age is readonly and after john is assigned, it cannot be changed
john = {
    name: "John",
    age: 32,
    spouse: "Jane",
};
// error - age is readonly
// john.age++;
// john.age = 40;
let jane = {
    name: "Jane",
    age: 28,
};
