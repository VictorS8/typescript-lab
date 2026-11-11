// Celsius to Farenheit m02-ex1
function transformarCelsiusEmFahrenheit(celcius: number): number {
  return (celcius * 9 / 5) + 32;
}

console.log(`Celsius: 35\nEm Fahrenheit: ${transformarCelsiusEmFahrenheit(35)}`);

// isEven m02-ex2
function ePar(number: number): boolean {
  return number % 2 === 0;
}

const eParArrowFunction = (n: number): boolean => n % 2 === 0;

console.log(`Numero 35 é ${ePar(35) ? "par!" : "impar!"}`);
console.log(`Arrow Function:\nNumero 35 é ${eParArrowFunction(35) ? "par!" : "impar!"}`);

// IMC m02-ex3
function calcularIMC(peso: number, alturaEmMetros: number): number {
  return peso / (alturaEmMetros ** 2);
}

console.log(`Meu peso: 60\nMinha altura: 1,71\nIMC: ${calcularIMC(60, 1.71).toFixed(2)}`);

// Categoria de Idade m03-ex1
function classificacaoDeIdade(idade: number): string {
  if (Number.isNaN(idade) || idade < 0) {
    return "Idade inválida";
  } else if (idade <= 12) {
    return "Criança";
  } else if (idade <= 17) {
    return "Adolescente";
  } else if (idade <= 59) {
    return "Adulto";
  } else {
    return "Idoso";
  }
}

console.log(`Minha idade: 35\nMinha classificacao: ${classificacaoDeIdade(35)}`)

// Bissexto m03-ex4
function eAnoBissexto(ano: number): boolean {
  return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
}

console.log(`2026: ${eAnoBissexto(2026) ? "Bissexto" : "Não é bissexto"}`)
