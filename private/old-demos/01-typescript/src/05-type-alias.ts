type NS = number | string;

// number | string -> a union type
let chequeAmount: NS = 1000;
chequeAmount = "One Thousand";
// chequeAmount = true; // Error: Type 'true' is not assignable to type 'string | number'

console.log(chequeAmount);

export type { NS };

// export {};
