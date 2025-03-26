"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is 'any' type - we avoid using it - no point of using TS if we stick to using this
let message /*: any*/;
message = "Hello World!!!";
console.log(message);
message = 100;
let greeting;
greeting = "Good morning";
// greeting = 100; // error
let isPresent;
isPresent = true;
let total;
total = 100;
// we do not use null type and undefined type on their own
let employee;
employee = null;
