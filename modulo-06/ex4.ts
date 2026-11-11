function meuFiltro(lista: number[], teste: (n: number) => boolean): number[] {
  const minhaLista: number[] = [];
  for (const numero of lista) {
    if (teste(numero)) minhaLista.push(numero)
  }
  return minhaLista;
}

const lista = [1, 2, 3, 4, 5, 6];

console.log(`Lista: ${lista}\nNova lista: ${meuFiltro(lista, (n) => n % 2 === 0)}`);
