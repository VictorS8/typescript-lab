// const value: any = "Hello, World!";
const value: any = 32;

// file:///home/powarch/Documents/learning-typescript/module-01/challenge.ts:4
// console.log(value.toUpperCase());
//                   ^

// TypeError: value.toUpperCase is not a function
//     at file:///home/powarch/Documents/learning-typescript/module-01/challenge.ts:4:19
//     at ModuleJob.run (node:internal/modules/esm/module_job:569:25)
//     at async node:internal/modules/esm/loader:650:26
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

// Node.js v26.8.2

console.log(value.toUpperCase());

console.log(typeof value);

// It's dangerous to use 'any' type because
// typescript will not check the type 
// Code will pass 'npm run check' but will
// fail when it run 
// (TypeError: value.toUpperCase is not a function) 
// if the value is not a string.

// With unknown type, TS will check the type 
// and will not allow it
// error will appears on code editor 
// if the value is not a string.