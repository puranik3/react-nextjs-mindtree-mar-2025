const john = {
    name: 'John',
    age: 32,
    emails: [
        'john@example.com',
        'john@gmail.com'
    ],
    address: {
        city: 'Mumbai',
        state: 'Maharashtra'
    }
};

const johnCompany = {
    name: 'Jonathan Doe',
    company: 'Example Consulting',
    designation: 'CEO'
};

const johnMasterDetails = {
    ...john,
    ...johnCompany,
    spouse: 'Jane',
};

console.log(johnMasterDetails);