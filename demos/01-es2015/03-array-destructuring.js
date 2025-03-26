// array -> array items
// object -> property values

const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];

// const first = weekdays[0], second = weekdays[1], fifth = weekdays[4];

// do the same with array destructuring...
const [first, second, , , fifth] = weekdays;

console.log(first, second, fifth);
