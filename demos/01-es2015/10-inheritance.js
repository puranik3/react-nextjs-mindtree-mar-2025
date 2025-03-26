class Person {
    nationality = 'Indian';

    constructor( name, age ) {
        this.name = name;
        this.age = age;
    }

    celebrateBirthday() {
        this.age++;
    }
}

class Employee extends Person {
    constructor( name, age, role, dept ) {
        super( name, age ); // calls base class, i.e. Person class constructor

        this.role = role;
        this.dept = dept;
    }

    promote() {
        this.role = `Senior ${this.role}`;
    }

    // override base class methods
    celebrateBirthday() {
        super.celebrateBirthday(); // call the base class, i.e. Person class celebrateBirthday()
        console.log( `Happy birthday ${this.name}` );
    }
}

const john = new Employee( 'John', 32, 'Accountant', 'Finance' );
john.celebrateBirthday();
john.promote();

console.log( john );

const jane = new Employee( 'Jane', 28, 'Developer', 'IT' );
jane.celebrateBirthday();
jane.celebrateBirthday();
jane.celebrateBirthday();

console.log( jane );
