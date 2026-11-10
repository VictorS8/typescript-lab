const number = Number(process.argv[2]);

if (!Number.isInteger(number) || number < 1) {
	console.log("Please provide a valid positive integer as an argument.");
} else {
	for (let i = 1; i <= 10; i++) {
		const result = number * i;
		console.log(`|${number}| x |${i}| = |${result}|`);
	}
}
