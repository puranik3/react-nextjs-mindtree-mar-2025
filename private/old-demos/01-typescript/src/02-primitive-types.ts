// this is 'any' type - we avoid using it - no point of using TS if we stick to using this
let message /*: any*/;

message = "Hello World!!!";
console.log(message);

message = 100;

let greeting: string;
greeting = "Good morning";
// greeting = 100; // error

let isPresent: boolean;
isPresent = true;

let total: number;
total = 100;

// we do not use null type and undefined type on their own
let employee: null;
employee = null;
// employee = { // error
//     name: "John",
//     role: "Frontend dev",
// };

export {}; // Make this a module
