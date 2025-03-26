// import { NS } from "./05-type-alias";

// number | string -> a union type
let chequeAmount: number | string = 1000;
chequeAmount = "One Thousand";
// chequeAmount = true; // Error: Type 'true' is not assignable to type 'string | number'

console.log(chequeAmount);

export {};
