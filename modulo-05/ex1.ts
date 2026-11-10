const listaDeNumeros: number[] = [77, 4, 6, 10, 55, 13, 200, 201, 400, 303, 78, 8, 5, 1];
let maior = listaDeNumeros[0];
let menor = listaDeNumeros[0];

for (const numero of listaDeNumeros) {
  if (numero > maior) maior = numero;
  else if (numero < menor) menor = numero;
}

console.log(`Maior: ${maior}\nMenor: ${menor}`);

console.log(`Usando Math.\nMaior: ${Math.max(...listaDeNumeros)}\nMenor: ${Math.min(...listaDeNumeros)}`)
