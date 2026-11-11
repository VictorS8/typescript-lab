function contador(): () => number {
  let valor = 0;
  return () => {
    valor = valor + 1;
    return valor;
  };
}

const proximo = contador();
console.log(proximo());
console.log(proximo());
console.log(proximo()); 
