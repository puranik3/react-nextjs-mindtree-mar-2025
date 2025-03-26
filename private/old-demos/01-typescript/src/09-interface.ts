// Interface defines the public facing API of a class
interface IPerson {
    name: string;
    age: number;
    spouse?: string;
    celebrateBirthday: (inc: number) => void;
}

// to give the data type for an object
const john: IPerson = {
    name: "John Doe",
    age: 32,
    spouse: "Jane Doe", // even if we remove this, it's ok
    celebrateBirthday: function (inc: number) {
        this.age += inc;
        // return this.age; // is ok
    },
};

// fields must be initialized when defining them, or provided values in the constructor
class Person implements IPerson {
    name: string;
    age: number;
    spouse?: string = "";

    constructor(name: string, age: number, spouse?: string) {
        this.name = name;
        this.age = age;
        this.spouse = spouse;
    }

    celebrateBirthday(inc: number) {
        this.age += inc;
    }
}

// class Person implements IPerson {}

// IPerson john = new Person()

const jane: Person = new Person("Jane Doe", 32, "John Doe");

export {
    IPerson as default, // main export (only 1 per file)
    Person, // named export
};

// export default IPerson;
