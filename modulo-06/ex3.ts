function media(...notas: number[]): number {
  if (notas.length === 0) return 0;
  let soma = 0;
  for (const nota of notas) {
    soma = soma + nota;
  }
  return soma / notas.length;
}

const notas = [9, 10, 10, 10];

console.log(`Notas: ${notas}\nA media: ${media(...notas).toFixed(2)}`);
