import IPerson from "./09-interface";

// by default access modifier is public
// private, protected, public (default) - 3 access modifiers in TS
class Person implements IPerson {
    // defining data member explicitly is not required in TS
    // name: string;
    // age: number;
    // spouse?: string = "";
    // private children: string[] = [];

    // define and initialize data members in the constructor
    constructor(
        public readonly name: string,
        public age: number,
        private children: string[] = [],
        public spouse?: string
    ) {
        // you don't have to assign the data member
        // this.name = name;
        // this.age = age;
        // this.spouse = spouse;
    }

    celebrateBirthday(inc: number) {
        this.age += inc;
    }

    addChildren(child: string) {
        this.children.push(child);
    }
}

class Employee extends Person {
    employeeId: number;

    constructor(
        name: string,
        age: number,
        children: string[] = [],
        employeeId: number,
        spouse?: string
    ) {
        super(name, age, children, spouse);

        this.employeeId = employeeId;
    }
}

// const john: Person = new Person("John Doe", 32, [ "Janette Doe"], "Jane Doe");
const john: Person = new Person("John Doe", 32, undefined, "Jane Doe");
// john.children.push("Jim Doe");
john.addChildren("Jim Doe");

// john.name = "Jonathan Doe"; // error: cannot assign to 'name' because it is a read-only property

export {};
