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

const name = john.name, age = john.age, firstEmail = john.emails[0], city = john.address.city, state = john.address.state;
console.log(name, age, firstEmail, city, state);

// do the same with object destructuring...
// todo...