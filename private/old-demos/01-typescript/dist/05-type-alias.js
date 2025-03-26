"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// number | string -> a union type
let chequeAmount = 1000;
chequeAmount = "One Thousand";
// chequeAmount = true; // Error: Type 'true' is not assignable to type 'string | number'
console.log(chequeAmount);
// export {};
