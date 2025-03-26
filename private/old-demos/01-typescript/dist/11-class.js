"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// by default access modifier is public
// private, protected, public (default) - 3 access modifiers in TS
class Person {
    // defining data member explicitly is not required in TS
    // name: string;
    // age: number;
    // spouse?: string = "";
    // private children: string[] = [];
    // define and initialize data members in the constructor
    constructor(name, age, children = [], spouse) {
        this.name = name;
        this.age = age;
        this.children = children;
        this.spouse = spouse;
        // you don't have to assign the data member
        // this.name = name;
        // this.age = age;
        // this.spouse = spouse;
    }
    celebrateBirthday(inc) {
        this.age += inc;
    }
    addChildren(child) {
        this.children.push(child);
    }
}
class Employee extends Person {
    constructor(name, age, children = [], employeeId, spouse) {
        super(name, age, children, spouse);
        this.employeeId = employeeId;
    }
}
// const john: Person = new Person("John Doe", 32, [ "Janette Doe"], "Jane Doe");
const john = new Person("John Doe", 32, undefined, "Jane Doe");
// john.children.push("Jim Doe");
john.addChildren("Jim Doe");
