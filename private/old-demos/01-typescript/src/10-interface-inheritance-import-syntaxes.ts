// default export outside braces, default export can be imported using any name
// named export inside braces
import IHuman, { Person as Human } from "./09-interface";
// import IXYZ from "./some/other/file";

interface IEmployee extends IHuman {
    role: string;
    department: string;

    promote: (newRole: string) => void;
}

const john: IEmployee = {
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
    promote: function (newRole: string) {
        this.role = newRole;
    },
};

export {};
