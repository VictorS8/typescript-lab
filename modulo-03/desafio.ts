const kwh = parseFloat(process.argv[2]);

// Até 100 KWh - R$ 0,50
const PRECO_FAIXA_1 = 0.50;
// De 101 a 200 KWh
const PRECO_FAIXA_2 = 0.70;
// De 201 a 300 KWh
const PRECO_FAIXA_3 = 0.90;

let valorTotal = 0;

const custoFaixa1Cheia = 100 * PRECO_FAIXA_1;
const custoFaixa2Cheia = 100 * PRECO_FAIXA_2;
if (kwh < 0 || Number.isNaN(kwh)) {
    console.log("Quantidade de KWh inválida");
} else if (kwh <= 100) {
    valorTotal = kwh * PRECO_FAIXA_1;
} else if (kwh <= 200) {
    valorTotal = custoFaixa1Cheia + (kwh - 100) * PRECO_FAIXA_2;
} else {
    valorTotal = custoFaixa1Cheia + custoFaixa2Cheia + (kwh - 200) * PRECO_FAIXA_3;
}

console.log("O valor total da conta de energia é: R$ " + valorTotal.toFixed(2));
