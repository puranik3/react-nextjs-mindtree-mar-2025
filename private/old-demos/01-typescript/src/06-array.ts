import type { NS } from "./05-type-alias";
// let chequeAmounts : any[] = [];

//  as number[] -> type assertion, i.e. type casting
let chequeAmounts: number[] | string[] = [] as number[];
chequeAmounts.push(100);
chequeAmounts.push(200);
// chequeAmounts.push("Three hundred");

let chequeAmounts2: (number | string)[] = [];
chequeAmounts2.push(100);
chequeAmounts2.push(200);
chequeAmounts2.push("Three thousand");

let chequeAmounts3: NS[] = [];
chequeAmounts3.push(100);
chequeAmounts3.push(200);
chequeAmounts3.push("Three thousand");
