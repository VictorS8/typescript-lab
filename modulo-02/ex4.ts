const value = 0;
console.log(value || "padrão"); // Output: "padrão"
console.log(value ?? "padrão"); // Output: 0

// Operação do ?? devolve o 0 porque 0 não é null nem undefined
// Porém na operação do || o 0 é considerado falsy, então o "padrão" será retornado

// Corrigido por adotar o 0 como uma constante e não diretamente como um zero literal
// Aviso que aparece na segunda operação com erro:
// Right operand of ?? is unreachable because the left operand is never nullish.ts(2869)
