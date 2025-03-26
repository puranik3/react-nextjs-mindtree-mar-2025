const john = {
    name: 'John',
    age: 32,
    emails: [
        'john@example.com',
        'john@gmail.com'
    ],
    address: {
        city: {
            name: 'Mumbai',
            area: 'Dadar'
        },
        state: 'Maharashtra'
    },
    children: [
        { name: 'Jack', age: 5 },
        { name: 'Jill', age: 3 },
    ]
};

// const name = john.name, age = john.age, firstEmail = john.emails[0], city = john.address.city, state = john.address.state;

// do the same with object destructuring...
const {
    age,
    name,
    emails: [firstEmail],
    address: {
        city,
        state
    },
} = john;

console.log(name, age, firstEmail, city, state);
// console.log(name, age, firstEmail, city, state);