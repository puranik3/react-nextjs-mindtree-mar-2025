// type Rating = 1 | 2 | 3 | 4 | 5

type Domain = "www.google.com" | "www.medium.com" | "www.facebook.com";

type MyRecord<T extends keyof any, U> = {
    [key in T]: U;
};

let dnsEntries: MyRecord<Domain, string> = {
    "www.google.com": "123.456.789.012",
    "www.medium.com": "234.456",
    "www.facebook.com": "123.232.121.122",
};

interface Mixed {
    id: number;
    name: string;
    greet(): void;
    update(data: string): boolean;
}

// 'id' | 'name' | 'greet' | 'update'
type KeyOfMixed = keyof Mixed;
const key1: KeyOfMixed = "greet";
// const key2: KeyOfMixed = "hello"; // error

type MixedNameType = Mixed["name"];

// interface MixedFunctions {
//     greet(): void;
//     update(data: string): boolean;
// }

// conditional opertaor in programming
// condition ? x : y
// never is like null but for data types
type OnlyFunctions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

// { id: never, name: never, greet: 'greet', update: 'update' }[keyof T] -> 'greet' | 'update'
type FunctionsInMixed = OnlyFunctions<Mixed>;
