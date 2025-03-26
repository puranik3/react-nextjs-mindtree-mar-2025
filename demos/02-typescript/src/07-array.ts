import type { NS } from "./05-type-alias";

let chequeAmounts: (number | string)[] = [1000, 2000, 3000];
// let chequeAmounts : NS[] = [1000, 2000, 3000];

chequeAmounts.push(4000);
chequeAmounts.push(5000);
chequeAmounts.push("Six thousand");

let chequeAmounts2: number[] | string[] = [1000, 2000, 3000]; // array with just numbers
chequeAmounts2 = ["One thousand", "Two thousand", "Three thousand"]; // array with just strings
// chequeAmounts2 = [1000, 'Two thousand', 3000]; // error
