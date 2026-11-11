function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

const formatador = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const formatarMoedaArrowFunction = (valor: number): string => formatador.format(valor);

const numero = 2503442.244;

console.log(`Numero ${numero}\nValor em Reais: ${formatarMoeda(numero)}`);
console.log(`Numero ${numero}\nValor em Reais: ${formatarMoedaArrowFunction(numero)}`)
