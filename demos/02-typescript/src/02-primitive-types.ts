let message /*: any*/; // any type

message = "Hello World!!!";
console.log(message);

message = 100;

// #2: string
let greeting: string;
greeting = "Good morning";
// greeting = 100; // error

// #3: boolean
let isPresent: boolean;
isPresent = true;

// #4: number
let total: number;
total = 100;

// #5: null, undefined
// we do not use null type and undefined type on their own
let employee: null;
employee = null;
// employee = {
//     // error
//     name: "John",
//     role: "Frontend dev",
// };

export {};
