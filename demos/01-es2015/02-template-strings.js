const john = {
    name: 'John',
    age: 32,
    address: {
        city: 'Bangalore',
        state: 'Karnataka'
    }
};

// do this without template strings
const tr1 = '<tr><td>' + john.name + '</td><td>' + john.age + '</td><td>' + john.address.city + ', ' + john.address.state + '</td><td>Next year ' + john.name + ' will be ' + (john.age + 1) + ' years old</td></tr>';
console.log(tr1);

// do the same with template string...
const tr2 = `
    <tr>
        <td>${john.name}</td>
        <td>${john.age}</td>
        <td>${john.address.city}, ${john.address.state}</td>
        <td>Next year ${john.name} will be ${john.age + 1} years old</td>
    </tr>
`;

console.log(tr2);