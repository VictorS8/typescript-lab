// number: let can be reassigned, so TS infers the type as number
let x = 10; // on x shows type number

// 10: const never changes, so only possible value is 10 (literal type)
const y = 10; // on y shows type 10

console.log("On x shows type number: ", typeof x);

// Appears number, because 10 is a number, but the type of y is a literal type 10, which is a subtype of number.
console.log("On y shows type 10: ", typeof y);

x = 20; // valid, because x is a number and using let

// invalid, because y is a literal type 10 and const cannot be reassigned
// y = 20;
// Error: Cannot assign to 'y' because it is a constant. 
