const argsUm = process.argv[2];
const argsDois = process.argv[3];
const argsTres = process.argv[4];

const numeroUm = parseInt(argsUm);
const numeroDois = parseInt(argsDois);
const numeroTres = parseInt(argsTres);

if (numeroUm > numeroDois && numeroUm > numeroTres) {
    console.log("O maior número é: " + numeroUm);
} else if (numeroDois > numeroTres) {
    console.log("O maior número é: " + numeroDois);
} else {
    console.log("O maior número é: " + numeroTres);
}

// Sugestao da IA
let maior = numeroUm;
if (numeroDois > maior) maior = numeroDois;
if (numeroTres > maior) maior = numeroTres;
console.log("IA: O maior número é: " + maior);
