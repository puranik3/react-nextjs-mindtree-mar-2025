{
    var varX = 1;
    console.log(varX); // 1
}

console.log(varX); // 1

// do the same with a let variable
// let variables have block scope
{
    let letX = 1;
    console.log(letX); // 1
}

// console.log(letX); // error : cannot use letX here (outside the block of declaration)

const x = 1; // should give initial value for const variable
// x = 2; // error : cannot reassign a const variable

const john = {
    name: 'John',
    age: 32
};

john.age = 33; // no error : can change the properties of a const object

console.log(john);

// john = {
//     name: 'John',
//     age: 34
// }; // error : cannot reassign a const object