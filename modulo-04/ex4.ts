const palavra = process.argv[2];

const vogais = ["a", "e", "i", "o", "u", "á", "à", "â", "ã", "é", "ê", "í", "ó", "ô", "õ", "ú"];
let numeroDeVogais = 0;

if (!palavra) {
  console.log("Por favor, forneça uma palavra como argumento.");
} else {
  for (const letra of palavra) {
    if (vogais.includes(letra.toLocaleLowerCase())) {
      numeroDeVogais++;
    }
  }
  console.log(`Número de vogais em "${palavra}": ${numeroDeVogais}`);
}