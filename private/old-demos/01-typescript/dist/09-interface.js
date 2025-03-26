"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
// to give the data type for an object
const john = {
    name: "John Doe",
    age: 32,
    spouse: "Jane Doe", // even if we remove this, it's ok
    celebrateBirthday: function (inc) {
        this.age += inc;
        // return this.age; // is ok
    },
};
// fields must be initialized when defining them, or provided values in the constructor
class Person {
    constructor(name, age, spouse) {
        this.spouse = "";
        this.name = name;
        this.age = age;
        this.spouse = spouse;
    }
    celebrateBirthday(inc) {
        this.age += inc;
    }
}
exports.Person = Person;
// class Person implements IPerson {}
// IPerson john = new Person()
const jane = new Person("Jane Doe", 32, "John Doe");
// export default IPerson;
