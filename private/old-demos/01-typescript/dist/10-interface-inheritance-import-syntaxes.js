"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const john = {
    // IHuman properties
    name: "John",
    age: 30,
    spouse: "Jane Doe",
    // IEmployee properties
    role: "Software Engineer",
    department: "Engineering",
    // methods
    // IHuman-specific
    celebrateBirthday: function () {
        this.age++;
    },
    // IEmpoyee-specific
    promote: function (newRole) {
        this.role = newRole;
    },
};
