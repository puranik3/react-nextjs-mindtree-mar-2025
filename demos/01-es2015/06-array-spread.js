// concatenate arrays
const primes1 = [2, 3, 5, 7];
const primes2 = [11, 13, 17, 19];

const primes3 = [-5, -3, -2, -1, 0, 1, ...primes1, 10, ...primes2, 29, 31, 37];
console.log(primes3);