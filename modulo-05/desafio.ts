const palavras: string[] = ["typescript", "javascript", "typescript", "react", "angular", "javascript"];

const contagem: [string, number][] = [];

for (const palavra of palavras) {
  const encontrada = contagem.find((item) => item[0] === palavra);

  if (encontrada) {
    encontrada[1] = encontrada[1] + 1;
  } else {
    contagem.push([palavra, 1]);
  }
}

console.log(contagem);

let palavraMaisFrequente = "";
let maiorQuantidade = 0;

for (const [palavra, quantidade] of contagem) {
  if (quantidade > maiorQuantidade) {
    palavraMaisFrequente = palavra;
    maiorQuantidade = quantidade;
  }
}

console.log(`Mais frequente: "${palavraMaisFrequente}" (${maiorQuantidade} vezes)`);
