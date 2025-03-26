type Person = {
    name: string;
    readonly age: number;
    spouse?: string;
};

const john: Person = {
    name: "John",
    age: 32,
    spouse: "Jane",
};

const jane: Person = {
    name: "Jane",
    age: 28,
    // spouse: "John",
};

jane.spouse = "John";

// john.age = 33; // property age is readonly (TS feature)

// const - error (JS feature)
// john = {

// }

export {};
