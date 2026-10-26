const value: unknown = "Hello, World!";

// value.toUpperCase(); => Error: 'value' is of type 'unknown'.

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
