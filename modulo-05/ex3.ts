const listaDePrecos = [10, 100, 55, 20, 80, 300]

const listaDePrecosComDesconto = listaDePrecos.map((numero) => (numero > 100 ? numero * 0.9 : numero));
const valorTotal = listaDePrecosComDesconto.reduce((soma, proximo) => soma + proximo, 0);

console.log(`lista de preco: ${listaDePrecos.map((numero) => numero.toFixed(2))}`);
console.log(`Com desconto: ${listaDePrecosComDesconto.map((numero) => numero.toFixed(2))}`);
console.log(`Valor total: ${valorTotal.toFixed(2)}`);
