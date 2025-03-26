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

const john = new Person( 'John', 32 );
john.celebrateBirthday();

console.log( john );

const jane = new Person( 'Jane', 28 );
jane.celebrateBirthday();
jane.celebrateBirthday();
jane.celebrateBirthday();

console.log( jane );
