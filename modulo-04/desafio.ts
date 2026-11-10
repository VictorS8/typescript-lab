const listaDePrimos: number[] = [];

// // Minha versão
// for (let i = 1; i <= 100; i++) {
//   let contadorDeDivisores = 0;
//   for (let j = 1; j <= i; j++) {
//     if (i % j === 0) {
//       contadorDeDivisores++;
//     }
//     if (contadorDeDivisores > 2) break;
//   }
//   if (contadorDeDivisores === 2) {
//     listaDePrimos.push(i);
//   }
// }

// Versão com break
for (let i = 2; i <= 100; i++) {
  let ehPrimo = true;
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      ehPrimo = false;
      break; // achou um divisor: não precisa testar mais nada
    }
  }
  if (ehPrimo) {
    listaDePrimos.push(i);
  }
}

console.log(`A lista de números primos de 1 a 100 é: ${listaDePrimos}`);
