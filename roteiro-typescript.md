# Roteiro de Estudo: TypeScript do Zero ao Avançado

## Resumo

Este roteiro tem **4 fases e 21 módulos**, cada um com objetivo, conceitos em ordem atômica (do mais simples ao mais composto), um exemplo curto, exercícios graduais e um desafio. A ordem segue a lógica do Handbook oficial do TypeScript, mas começa pelos fundamentos de programação (variáveis, condições, loops), que o Handbook assume que você já conhece.

| Fase | Módulos | Foco |
|------|---------|------|
| 0. Ambiente | 0 | Preparar a pasta de estudos no VS Code |
| 1. Fundamentos | 1 a 7 | Variáveis, operadores, condições, loops, arrays, funções, objetos |
| 2. Sistema de tipos | 8 a 14 | Unions, narrowing, classes, módulos, erros, testes |
| 3. Avançado | 15 a 20 | Generics, manipulação de tipos, utility types, assincronismo |
| 4. Projeto final | 21 | Uma aplicação de linha de comando juntando tudo |

---

## Como usar este roteiro

1. **Leia o "Conceitos" em ordem.** Cada item depende do anterior.
2. **Digite o exemplo** em vez de copiar e colar. A memória muscular ajuda.
3. **Faça os exercícios em arquivos separados**, por exemplo `modulo-03/ex1.ts`.
4. **Só avance quando o editor não mostrar nenhum sublinhado vermelho** e o resultado no terminal estiver correto.
5. **Mande suas soluções no chat** para eu corrigir e explicar alternativas.
6. Use a coluna **Leitura** para aprofundar na documentação oficial.

> Lembrete do fundamento: o VS Code (com o TypeScript) **verifica** os tipos. O Node **executa** removendo os tipos, sem verificar. Por isso olhe sempre os erros no editor ou rode `npm run check` antes de executar.

---

# FASE 0: AMBIENTE

## Módulo 0: Preparando o projeto de estudos

**Objetivo:** ter uma pasta configurada para que o VS Code verifique tipos do mesmo jeito que o Node executa.

**Conceitos:**
1. `package.json`: arquivo que identifica um projeto Node e guarda configurações e dependências.
2. `"type": "module"`: diz ao Node que seus arquivos usam `import` e `export` (o padrão moderno, chamado ES Modules).
3. `typescript` instalado localmente: dá o comando `tsc`, o verificador oficial.
4. `@types/node`: descreve os tipos das funções do próprio Node (ler arquivos, terminal, testes).
5. `tsconfig.json`: arquivo que diz ao TypeScript **como** verificar seu código.

**Passo a passo** (no terminal do VS Code, dentro da pasta `estudos-typescript`):

```bash
npm init -y
npm install -D typescript @types/node
```

Abra o `package.json` gerado e deixe parecido com isto (adicione `"type"` e o script `"check"`):

```json
{
  "name": "estudos-typescript",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "check": "tsc"
  },
  "devDependencies": {
    "@types/node": "...",
    "typescript": "..."
  }
}
```

Crie o `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noEmit": true,
    "target": "esnext",
    "module": "nodenext",
    "strict": true,
    "moduleDetection": "force",
    "rewriteRelativeImportExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "types": ["node"]
  }
}
```

**O que cada opção faz, de forma atômica:**

| Opção | Significado |
|-------|-------------|
| `noEmit` | Só verifica, não gera arquivos `.js` (quem executa é o Node) |
| `target: esnext` | Considera a versão mais recente do JavaScript |
| `module: nodenext` | Segue as regras de módulos do Node moderno |
| `strict` | Liga todas as verificações rigorosas. **Essencial para aprender direito** |
| `moduleDetection: force` | Trata cada arquivo como isolado, assim `ex1.ts` e `ex2.ts` podem ter variáveis com o mesmo nome |
| `rewriteRelativeImportExtensions` | Permite escrever `import "./arquivo.ts"` com a extensão, como o Node exige |
| `erasableSyntaxOnly` | Avisa no editor quando você usar algo que o Node não consegue executar (como `enum`) |
| `verbatimModuleSyntax` | Exige `import type` para importar só tipos, como o Node exige |
| `types: ["node"]` | Carrega os tipos do Node |

**Comandos que você vai usar o tempo todo:**

```bash
node modulo-01/ex1.ts     # executa um arquivo
npm run check             # verifica os tipos de TODOS os arquivos da pasta
```

**Exercício 0.1:** crie `modulo-00/teste.ts` com `const x: number = "texto";`. Rode `npm run check` e leia o erro. Depois rode `node modulo-00/teste.ts` e observe que ele executa mesmo assim. Corrija o erro e rode `npm run check` de novo até não aparecer nada.

---

# FASE 1: FUNDAMENTOS

## Módulo 1: Variáveis e tipos primitivos

**Objetivo:** guardar valores e entender o que é um "tipo".

**Conceitos:**
1. **Valor**: um dado (`42`, `"Ana"`, `true`).
2. **Variável**: um nome que aponta para um valor.
3. **`const`**: variável que não pode ser reatribuída. Use por padrão.
4. **`let`**: variável que pode mudar. Use só quando precisar.
5. **`var`**: forma antiga, evite (tem regras de escopo confusas).
6. **Tipo**: o "formato" de um valor. Os primitivos são `string`, `number`, `boolean`, `null`, `undefined`, `bigint` e `symbol`.
7. **Anotação de tipo**: `let idade: number = 30;` declara o tipo explicitamente.
8. **Inferência**: `let idade = 30;` o TypeScript deduz `number` sozinho. Prefira a inferência quando o tipo é óbvio.
9. **`any`**: desliga a verificação. Evite.
10. **`unknown`**: "não sei o tipo ainda", mas obriga você a verificar antes de usar. É o substituto seguro do `any`.

**Exemplo:**

```ts
const nome = "Maria";          // inferido como string
let idade: number = 28;        // anotado explicitamente
let ativo = true;              // inferido como boolean

idade = idade + 1;             // ok, let permite mudar
// nome = "João";              // erro: const não pode ser reatribuída
// idade = "vinte";            // erro: string não é number

console.log(nome, idade, ativo);
console.log(typeof nome);      // "string"
```

**Exercícios:**
1. Declare variáveis para nome, cidade, ano de nascimento e se a pessoa tem CNH. Imprima uma frase com todos os dados.
2. Calcule a idade a partir do ano de nascimento e do ano atual (use `new Date().getFullYear()`).
3. Passe o mouse sobre cada variável no VS Code e anote o tipo que o editor mostra. Compare `let x = 10` com `const y = 10`. Por que `y` aparece com tipo `10` e não `number`? (Dica: pesquise "literal types", veremos no módulo 8.)
4. Declare `let valor: unknown = "texto";` e tente fazer `valor.toUpperCase()`. Leia o erro. Depois envolva em `if (typeof valor === "string") { ... }` e veja o erro sumir.

**Desafio:** troque o `unknown` do exercício 4 por `any` e observe que o erro some sem nenhuma verificação. Escreva em um comentário por que isso é perigoso.

**Leitura:** [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html), [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [Variable Declaration](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

---

## Módulo 2: Operadores e expressões

**Objetivo:** fazer contas, comparar valores e montar textos.

**Conceitos:**
1. **Aritméticos**: `+ - * / % **` (o `%` é o resto da divisão, `**` é potência).
2. **Atribuição composta**: `x += 1`, `x *= 2`, `x++`.
3. **Comparação estrita**: `===` e `!==` comparam valor **e** tipo. Sempre prefira estes.
4. **Comparação frouxa**: `==` converte tipos antes (`"5" == 5` é `true`). Evite.
5. **Lógicos**: `&&` (e), `||` (ou), `!` (não).
6. **Nullish coalescing**: `a ?? b` usa `b` só se `a` for `null` ou `undefined`.
7. **Optional chaining**: `obj?.prop` acessa sem quebrar se `obj` não existir.
8. **Template strings**: `` `Olá, ${nome}` `` monta textos com variáveis dentro.

**Exemplo:**

```ts
const preco = 50;
const quantidade = 3;
const total = preco * quantidade;

const temDesconto = total > 100 && quantidade >= 3;
const cupom: string | undefined = undefined;
const codigo = cupom ?? "SEM-CUPOM";

console.log(`Total: R$ ${total.toFixed(2)} | Desconto: ${temDesconto} | Cupom: ${codigo}`);
console.log(10 % 3);   // 1
console.log(2 ** 10);  // 1024
```

**Exercícios:**
1. Converta uma temperatura de Celsius para Fahrenheit (`F = C * 9/5 + 32`) e imprima com template string.
2. Dado um número, descubra se é par usando `%` e guarde o resultado em uma variável `boolean`.
3. Calcule o IMC (`peso / altura ** 2`) e mostre com duas casas decimais.
4. Teste no código: `0 || "padrão"` e `0 ?? "padrão"`. Explique em um comentário por que os resultados são diferentes.

**Desafio:** dado um total em segundos (ex.: `3725`), mostre no formato `1h 2min 5s` usando só `/`, `%` e `Math.floor`.

**Leitura:** [MDN: Expressões e operadores](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators)

---

## Módulo 3: Condições

**Objetivo:** fazer o programa tomar decisões.

**Conceitos:**
1. **`if`**: executa um bloco se a condição for verdadeira.
2. **`else if` / `else`**: caminhos alternativos.
3. **Truthy e falsy**: valores que contam como falso são `false`, `0`, `""`, `null`, `undefined` e `NaN`. Todo o resto conta como verdadeiro.
4. **Operador ternário**: `condicao ? valorSeSim : valorSeNao`, para escolher um valor em uma linha.
5. **`switch`**: compara um valor contra vários casos. Não esqueça o `break`.
6. **Early return**: sair cedo de uma função em vez de aninhar muitos `if`.

**Exemplo:**

```ts
const nota = 7.5;

if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}

const situacao = nota >= 7 ? "passou" : "não passou";

const dia = 3;
switch (dia) {
  case 1: console.log("Domingo"); break;
  case 7: console.log("Sábado"); break;
  default: console.log("Dia útil");
}
```

**Exercícios:**
1. Classifique uma idade em: criança (0 a 12), adolescente (13 a 17), adulto (18 a 59), idoso (60+).
2. Dados três números, imprima o maior sem usar `Math.max`.
3. Usando `switch`, converta o número de um mês (1 a 12) no nome do mês.
4. Verifique se um ano é bissexto (divisível por 4, mas não por 100, exceto se divisível por 400).

**Desafio:** calcule o valor de uma conta de luz com faixas: até 100 kWh custa R$ 0,50 por kWh; de 101 a 200 custa R$ 0,70 por kWh **excedente**; acima de 200 custa R$ 0,90 por kWh excedente. Teste com 80, 150 e 250 kWh.

**Leitura:** [MDN: Controle de fluxo](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

---

## Módulo 4: Loops (repetições)

**Objetivo:** repetir ações sem repetir código.

**Conceitos:**
1. **`for` clássico**: `for (let i = 0; i < 5; i++)`, quando você sabe quantas vezes repetir.
2. **`while`**: repete enquanto a condição for verdadeira.
3. **`do...while`**: executa ao menos uma vez, depois testa.
4. **`for...of`**: percorre os **valores** de uma lista. É o mais usado no dia a dia.
5. **`for...in`**: percorre as **chaves** de um objeto. Não use em arrays.
6. **`break`**: sai do loop. **`continue`**: pula para a próxima volta.
7. **Loop infinito**: esquecer de mudar a condição. Se travar, aperte `Ctrl + C` no terminal.

**Exemplo:**

```ts
for (let i = 1; i <= 5; i++) {
  console.log(`Volta ${i}`);
}

const frutas = ["maçã", "banana", "uva"];
for (const fruta of frutas) {
  console.log(fruta);
}

let tentativas = 0;
while (tentativas < 3) {
  tentativas++;
  if (tentativas === 2) continue;
  console.log(`Tentativa ${tentativas}`);
}
```

**Exercícios:**
1. Imprima a tabuada de um número (de 1 a 10).
2. Some todos os números de 1 a 100.
3. Imprima de 1 a 50, mas troque múltiplos de 3 por "Fizz", múltiplos de 5 por "Buzz" e múltiplos de ambos por "FizzBuzz".
4. Conte quantas vogais existem em uma frase usando `for...of` sobre a string.

**Desafio:** imprima todos os números primos entre 1 e 100 (você vai precisar de um loop dentro de outro e de `break`).

**Leitura:** [MDN: Laços e iterações](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Loops_and_iteration)

---

## Módulo 5: Arrays e tuplas

**Objetivo:** trabalhar com listas de valores.

**Conceitos:**
1. **Array**: lista ordenada. Tipo `number[]` ou `Array<number>`.
2. **Índice**: posição, começando em `0`. `lista.length` é o tamanho.
3. **Mutação**: `push`, `pop`, `shift`, `unshift`, `splice` alteram o array original.
4. **Métodos que criam novo array** (preferidos):
   - `map`: transforma cada item.
   - `filter`: mantém só os que passam no teste.
   - `reduce`: acumula tudo em um único valor.
   - `find`, `some`, `every`, `includes`, `sort`, `slice`.
5. **`readonly number[]`**: array que não pode ser alterado.
6. **Tupla**: array de tamanho e tipos fixos, ex.: `[string, number]`.
7. **Desestruturação**: `const [primeiro, segundo] = lista;`
8. **Spread**: `[...lista1, ...lista2]` junta arrays.

**Exemplo:**

```ts
const notas: number[] = [8, 6.5, 9, 4, 7];

const aprovadas = notas.filter((n) => n >= 7);
const dobradas = notas.map((n) => n * 2);
const soma = notas.reduce((acumulado, n) => acumulado + n, 0);
const media = soma / notas.length;

const aluno: [string, number] = ["Ana", 8.5]; // tupla
const [nomeAluno, notaAluno] = aluno;

console.log(aprovadas, dobradas, media.toFixed(1), nomeAluno, notaAluno);
```

**Exercícios:**
1. Dado um array de números, encontre o maior e o menor **sem** `Math.max`/`Math.min` (use loop) e depois **com** eles (use spread).
2. Dado um array de nomes, crie outro com todos em maiúsculas (`map`).
3. Dado um array de preços, calcule o total com 10% de desconto em itens acima de R$ 100 (`map` + `reduce`).
4. Remova os números duplicados de `[1, 2, 2, 3, 4, 4, 5]` (dica: pesquise `Set`).

**Desafio:** dado um array de palavras, conte quantas vezes cada uma aparece e mostre a mais frequente.

**Leitura:** [Everyday Types: Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays), [Object Types: Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

---

## Módulo 6: Funções

**Objetivo:** empacotar lógica reutilizável com entradas e saídas tipadas.

**Conceitos:**
1. **Declaração**: `function nome(param: tipo): tipoRetorno { }`.
2. **Parâmetros tipados**: o TypeScript exige tipo em parâmetros (com `strict`).
3. **Tipo de retorno**: pode ser inferido, mas anotar ajuda a pegar erros.
4. **`void`**: a função não retorna nada útil.
5. **Parâmetro opcional**: `nome?: string` (pode vir `undefined`).
6. **Valor padrão**: `taxa = 0.1`.
7. **Rest parameters**: `...numeros: number[]` recebe vários argumentos.
8. **Arrow function**: `const dobro = (n: number) => n * 2;`
9. **Função como valor**: passar função para outra função (callback). Tipo: `(n: number) => number`.
10. **`never`**: função que nunca termina normalmente (sempre lança erro).
11. **Função pura**: mesma entrada, mesma saída, sem efeitos colaterais. Mais fácil de testar.

**Exemplo:**

```ts
function calcularPreco(valor: number, desconto = 0, cupom?: string): number {
  let final = valor - valor * desconto;
  if (cupom === "PROMO10") final -= 10;
  return final;
}

const somar = (...numeros: number[]): number =>
  numeros.reduce((a, b) => a + b, 0);

function aplicar(lista: number[], operacao: (n: number) => number): number[] {
  return lista.map(operacao);
}

console.log(calcularPreco(100));
console.log(calcularPreco(100, 0.2, "PROMO10"));
console.log(somar(1, 2, 3, 4));
console.log(aplicar([1, 2, 3], (n) => n * 10));
```

**Exercícios:**
1. Transforme os exercícios dos módulos 2 e 3 (IMC, bissexto, classificação de idade) em funções tipadas.
2. Crie `formatarMoeda(valor: number): string` que retorna `"R$ 1.234,56"` (dica: `toLocaleString("pt-BR", ...)`).
3. Crie `media(...notas: number[])` que retorna a média, e retorna `0` se nenhuma nota for passada.
4. Crie sua própria versão de `filter`: `meuFiltro(lista: number[], teste: (n: number) => boolean): number[]`, usando loop.

**Desafio:** crie uma função `contador()` que retorna outra função; cada chamada da função retornada devolve o próximo número (1, 2, 3...). Pesquise o conceito de **closure** para entender por que funciona.

**Leitura:** [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

---

## Módulo 7: Objetos, `type` e `interface`

**Objetivo:** modelar dados com várias propriedades.

**Conceitos:**
1. **Objeto**: conjunto de pares chave e valor: `{ nome: "Ana", idade: 30 }`.
2. **Tipo de objeto inline**: `{ nome: string; idade: number }`.
3. **`type` alias**: dá nome a um tipo: `type Pessoa = { ... }`.
4. **`interface`**: outra forma de nomear formatos de objetos. Na prática, para objetos, os dois funcionam quase igual.
5. **Propriedade opcional**: `email?: string`.
6. **`readonly`**: propriedade que não pode ser alterada.
7. **Tipos aninhados**: um objeto dentro de outro.
8. **Extensão**: `interface Aluno extends Pessoa` ou `type Aluno = Pessoa & { matricula: string }`.
9. **Index signature**: `{ [chave: string]: number }` para objetos com chaves dinâmicas.
10. **Desestruturação e spread** de objetos: `const { nome } = pessoa;` e `{ ...pessoa, idade: 31 }`.

**Exemplo:**

```ts
type Endereco = {
  cidade: string;
  uf: string;
};

interface Pessoa {
  readonly id: number;
  nome: string;
  email?: string;
  endereco: Endereco;
}

interface Funcionario extends Pessoa {
  salario: number;
}

const f: Funcionario = {
  id: 1,
  nome: "Carlos",
  endereco: { cidade: "Fortaleza", uf: "CE" },
  salario: 4500,
};

const comAumento = { ...f, salario: f.salario * 1.1 };
const { nome, endereco: { cidade } } = f;

console.log(nome, cidade, comAumento.salario);
// f.id = 2; // erro: readonly
```

**Exercícios:**
1. Modele um `Produto` (id, nome, preço, estoque, categoria opcional) e crie um array com 5 produtos.
2. Crie uma função que recebe esse array e retorna o valor total em estoque (preço × estoque).
3. Crie uma função que retorna apenas os produtos com estoque abaixo de 5.
4. Crie `atualizarPreco(produto: Produto, percentual: number): Produto` que retorna um **novo** objeto sem alterar o original.

**Desafio:** modele uma agenda de contatos (`Contato` com nome, telefones como array e endereço aninhado opcional) e crie funções para adicionar, buscar por nome (ignorando maiúsculas) e listar ordenado alfabeticamente.

**Leitura:** [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html), [Everyday Types: Type Aliases e Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)

---

# FASE 2: SISTEMA DE TIPOS

## Módulo 8: Union types, literal types e null

**Objetivo:** expressar "pode ser isto **ou** aquilo".

**Conceitos:**
1. **Union**: `string | number` aceita qualquer um dos dois.
2. **Literal type**: um tipo que é um valor exato: `"sim"`, `42`, `true`.
3. **Union de literais**: `type Status = "pendente" | "pago" | "cancelado";` funciona como uma lista fechada de opções.
4. **`null` e `undefined`**: com `strict`, eles **não** cabem em outros tipos. Você precisa declarar: `string | null`.
5. **Non-null assertion** `valor!`: "confie em mim, não é nulo". Evite, pois desliga a proteção.
6. **`as const`**: congela um valor no tipo mais específico possível.

**Exemplo:**

```ts
type Status = "pendente" | "pago" | "cancelado";

function descrever(status: Status): string {
  if (status === "pago") return "Pagamento confirmado";
  if (status === "cancelado") return "Pedido cancelado";
  return "Aguardando pagamento";
}

let id: string | number = 10;
id = "ABC-10";

function buscarUsuario(id: number): string | null {
  return id === 1 ? "Ana" : null;
}

const usuario = buscarUsuario(2);
console.log(usuario?.toUpperCase() ?? "Não encontrado");
console.log(descrever("pago"));
// descrever("estornado"); // erro: não está na lista
```

**Exercícios:**
1. Crie `type Direcao = "norte" | "sul" | "leste" | "oeste"` e uma função que retorna a direção oposta.
2. Crie `formatarId(id: string | number): string` que retorna sempre com o prefixo `"ID-"`.
3. Crie `primeiroPar(lista: number[]): number | undefined` e trate o retorno corretamente ao usar.
4. Crie `const CORES = ["vermelho", "verde", "azul"] as const;` e passe o mouse para ver o tipo. Compare com a versão sem `as const`.

**Desafio:** modele um semáforo com `type Sinal = "verde" | "amarelo" | "vermelho"` e uma função `proximo(sinal: Sinal): Sinal`. Faça um loop que simula 10 trocas.

**Leitura:** [Everyday Types: Union Types e Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

---

## Módulo 9: Narrowing (estreitamento de tipos)

**Objetivo:** entender como o TypeScript "descobre" o tipo exato dentro de um `if`. Este é um dos conceitos mais importantes da linguagem.

**Conceitos:**
1. **Narrowing**: dentro de um bloco, o TypeScript reduz um tipo amplo (`string | number`) para um específico (`string`) com base nas suas verificações.
2. **`typeof`**: para primitivos (`typeof x === "string"`).
3. **Truthiness**: `if (valor)` elimina `null` e `undefined`.
4. **Igualdade**: `if (x === "pago")`.
5. **`in`**: `if ("latido" in animal)` verifica se a propriedade existe.
6. **`instanceof`**: para classes (`if (erro instanceof Error)`).
7. **Discriminated union**: vários tipos de objeto com uma propriedade comum (o "discriminante", ex.: `tipo`) que identifica cada um.
8. **Verificação exaustiva com `never`**: garante que você tratou todos os casos.

**Exemplo:**

```ts
type Circulo = { tipo: "circulo"; raio: number };
type Retangulo = { tipo: "retangulo"; largura: number; altura: number };
type Forma = Circulo | Retangulo;

function area(forma: Forma): number {
  switch (forma.tipo) {
    case "circulo":
      return Math.PI * forma.raio ** 2;          // aqui forma é Circulo
    case "retangulo":
      return forma.largura * forma.altura;       // aqui forma é Retangulo
    default: {
      const exaustivo: never = forma;            // erro se faltar algum caso
      return exaustivo;
    }
  }
}

console.log(area({ tipo: "circulo", raio: 2 }).toFixed(2));
```

**Exercícios:**
1. Crie `tamanho(valor: string | number[]): number` que retorna o comprimento da string ou do array.
2. Adicione `Triangulo` (base e altura) à `Forma` do exemplo. Observe o erro no `never` **antes** de adicionar o `case`. Esse é o valor da verificação exaustiva.
3. Modele `type Resultado = { ok: true; valor: number } | { ok: false; erro: string }` e uma função `dividir(a, b)` que retorna erro se `b` for zero. Use o resultado com narrowing.
4. Modele pagamentos: `Pix` (chave), `Cartao` (número, parcelas) e `Boleto` (código de barras). Crie uma função que descreve cada pagamento.

**Desafio:** modele eventos de um app (`clique` com x/y, `tecla` com a tecla pressionada, `rolagem` com a distância) e crie um processador que gera um log textual de uma lista de eventos.

**Leitura:** [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

## Módulo 10: Enums e suas alternativas

**Objetivo:** representar conjuntos fixos de opções e entender uma limitação importante do Node.

**Conceitos:**
1. **`enum`**: recurso do TypeScript que cria um conjunto nomeado de constantes.
2. **Por que o Node não executa `enum`**: o Node apenas **apaga** tipos. Um `enum` não é só tipo, ele gera código JavaScript novo, e o Node não gera código. Por isso o `erasableSyntaxOnly` do seu `tsconfig` vai marcar erro.
3. **Alternativa 1**: union de literais (módulo 8). A mais simples.
4. **Alternativa 2**: objeto com `as const` e um tipo derivado dele, quando você precisa dos valores em tempo de execução (para listar, iterar etc.).

**Exemplo:**

```ts
// Isso funciona no Playground, mas NÃO no Node:
// enum Cor { Vermelho, Verde }

// Alternativa recomendada:
const Cor = {
  Vermelho: "VERMELHO",
  Verde: "VERDE",
  Azul: "AZUL",
} as const;

type Cor = (typeof Cor)[keyof typeof Cor]; // "VERMELHO" | "VERDE" | "AZUL"

function pintar(cor: Cor) {
  console.log(`Pintando de ${cor}`);
}

pintar(Cor.Verde);
console.log(Object.values(Cor)); // dá para listar em tempo de execução
```

> A linha `type Cor = ...` usa `typeof` e `keyof` em nível de tipo. Por enquanto, aceite como receita; ela vai fazer total sentido no módulo 16.

**Exercícios:**
1. Escreva um `enum` de dias da semana no **Playground** e veja o JavaScript gerado à direita. Isso mostra por que o Node não consegue apenas "apagar".
2. Recrie os dias da semana com `as const` e o tipo derivado.
3. Crie uma função que recebe um dia e retorna se é fim de semana.

**Desafio:** crie níveis de log (`DEBUG`, `INFO`, `WARN`, `ERROR`) com `as const` e uma função `log(nivel, mensagem)` que só imprime mensagens a partir de um nível mínimo configurado.

**Leitura:** [Enums](https://www.typescriptlang.org/docs/handbook/enums.html), [Node.js: TypeScript features](https://nodejs.org/api/typescript.html#typescript-features)

---

## Módulo 11: Classes e orientação a objetos

**Objetivo:** criar "moldes" de objetos com dados e comportamentos.

**Conceitos:**
1. **Classe**: molde. **Instância**: objeto criado com `new`.
2. **Propriedades** e **`constructor`**: inicializam o objeto.
3. **Métodos**: funções que pertencem à classe. **`this`** referencia a instância.
4. **Modificadores**: `public` (padrão), `private` e `protected` (verificados só pelo TypeScript), `readonly`.
5. **`#privado`**: privacidade real do JavaScript, que vale também em tempo de execução.
6. **Getters e setters**: `get saldo()` parece propriedade, mas executa lógica.
7. **Herança**: `extends` e `super`.
8. **`abstract`**: classe que não pode ser instanciada diretamente, só herdada.
9. **`implements`**: a classe promete seguir uma `interface`.
10. **`static`**: pertence à classe, não à instância.
11. **Atenção ao Node**: o atalho `constructor(private nome: string)` (chamado *parameter property*) gera código e **não funciona** no Node. Declare as propriedades separadamente, como no exemplo.

**Exemplo:**

```ts
interface Descritivel {
  descrever(): string;
}

abstract class Conta implements Descritivel {
  #saldo = 0;
  readonly titular: string;

  constructor(titular: string) {
    this.titular = titular;
  }

  get saldo(): number {
    return this.#saldo;
  }

  depositar(valor: number): void {
    if (valor <= 0) throw new Error("Valor inválido");
    this.#saldo += valor;
  }

  protected debitar(valor: number): void {
    this.#saldo -= valor;
  }

  abstract sacar(valor: number): void;

  descrever(): string {
    return `${this.titular}: R$ ${this.saldo.toFixed(2)}`;
  }
}

class ContaCorrente extends Conta {
  limite: number;

  constructor(titular: string, limite: number) {
    super(titular);
    this.limite = limite;
  }

  sacar(valor: number): void {
    if (valor > this.saldo + this.limite) throw new Error("Saldo insuficiente");
    this.debitar(valor);
  }
}

const c = new ContaCorrente("Ana", 500);
c.depositar(1000);
c.sacar(1200);
console.log(c.descrever());
```

**Exercícios:**
1. Crie uma classe `Retangulo` com largura, altura e métodos `area()` e `perimetro()`.
2. Crie `ContaPoupanca` que herda de `Conta`, não permite saldo negativo e tem `renderJuros(taxa)`.
3. Crie uma classe `Carrinho` com uma lista privada de itens e métodos `adicionar`, `remover`, `total` e `quantidadeItens`.
4. Crie uma `interface Animal` com `emitirSom(): string` e três classes que a implementam. Percorra um array `Animal[]` chamando o método.

**Desafio:** crie uma classe `Biblioteca` que gerencia `Livro`s e `Usuario`s, com empréstimo (máximo de 3 livros por usuário), devolução e listagem dos livros disponíveis. Lance erros para operações inválidas.

**Leitura:** [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

---

## Módulo 12: Módulos (import e export)

**Objetivo:** dividir o código em vários arquivos.

**Conceitos:**
1. **Módulo**: um arquivo que exporta coisas para outros arquivos usarem.
2. **`export`**: torna algo visível fora do arquivo.
3. **`import { x } from "./arquivo.ts"`**: traz algo de outro arquivo. **No Node a extensão `.ts` é obrigatória.**
4. **`export default`**: uma exportação "principal" do arquivo. Prefira exports nomeados, são mais claros.
5. **`import type`**: importa **só tipos**. Obrigatório no Node, porque tipos são apagados e o import normal procuraria um valor que não existe.
6. **Módulos nativos do Node**: `import { readFile } from "node:fs/promises";`

**Exemplo** (dois arquivos na pasta `modulo-12/`):

```ts
// modulo-12/matematica.ts
export type Operacao = (a: number, b: number) => number;

export const somar: Operacao = (a, b) => a + b;
export const multiplicar: Operacao = (a, b) => a * b;
```

```ts
// modulo-12/main.ts
import { somar, multiplicar } from "./matematica.ts";
import type { Operacao } from "./matematica.ts";

const ops: Operacao[] = [somar, multiplicar];
for (const op of ops) console.log(op(3, 4));
```

Execute com `node modulo-12/main.ts`.

**Exercícios:**
1. Mova as funções do módulo 6 para `utils.ts` e importe-as em `main.ts`.
2. Crie `tipos.ts` só com tipos (`Produto`, `Categoria`) e importe com `import type`. Depois tente sem o `type` e leia o erro do editor.
3. Use `node:fs/promises` para ler um arquivo `dados.txt` e imprimir quantas linhas ele tem.

**Desafio:** organize o código da `Biblioteca` (módulo 11) em arquivos: `modelos.ts`, `biblioteca.ts` e `main.ts`.

**Leitura:** [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html), [Node.js: Determining module system](https://nodejs.org/api/typescript.html#determining-module-system)

---

## Módulo 13: Tratamento de erros

**Objetivo:** lidar com falhas sem derrubar o programa.

**Conceitos:**
1. **`throw`**: lança um erro e interrompe o fluxo.
2. **`try / catch / finally`**: tenta executar, captura o erro, e `finally` executa sempre.
3. **O erro no `catch` é `unknown`**: qualquer coisa pode ser lançada em JavaScript, então o TypeScript obriga você a verificar (`instanceof Error`) antes de usar.
4. **Classes de erro customizadas**: `class SaldoInsuficienteError extends Error`.
5. **Erro como valor**: em vez de lançar, retornar um `Resultado` (você já fez no módulo 9). É uma alternativa mais explícita.

**Exemplo:**

```ts
class ValidacaoError extends Error {
  campo: string;
  constructor(campo: string, mensagem: string) {
    super(mensagem);
    this.name = "ValidacaoError";
    this.campo = campo;
  }
}

function validarIdade(idade: number): number {
  if (!Number.isInteger(idade)) throw new ValidacaoError("idade", "Deve ser inteiro");
  if (idade < 0) throw new ValidacaoError("idade", "Não pode ser negativa");
  return idade;
}

try {
  validarIdade(-5);
} catch (erro) {
  if (erro instanceof ValidacaoError) {
    console.log(`Campo ${erro.campo}: ${erro.message}`);
  } else {
    throw erro;
  }
} finally {
  console.log("Validação encerrada");
}
```

**Exercícios:**
1. Crie `converterNumero(texto: string): number` que lança erro se o texto não for número (dica: `Number.isNaN`).
2. Adicione classes de erro próprias à `Conta` do módulo 11 (`SaldoInsuficienteError`, `ValorInvalidoError`) e trate cada uma de forma diferente.
3. Leia `JSON.parse` de um texto inválido dentro de `try/catch` e mostre uma mensagem amigável.

**Desafio:** crie um validador de cadastro (nome, email, idade, senha) que **acumula** todos os erros encontrados em um array em vez de parar no primeiro, e retorna um `Resultado`.

**Leitura:** [MDN: try...catch](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch)

---

## Módulo 14: Testes automatizados

**Objetivo:** provar que seu código funciona, sem instalar nada além do Node.

**Conceitos:**
1. **Teste automatizado**: código que verifica outro código.
2. **`node:test`**: executor de testes nativo do Node.
3. **`node:assert/strict`**: funções de verificação (`equal`, `deepEqual`, `throws`).
4. **Arrange, Act, Assert**: preparar dados, executar, verificar.
5. **Casos de borda**: zero, lista vazia, valores negativos, texto vazio.

**Exemplo:**

```ts
// modulo-14/calculos.ts
export function media(...notas: number[]): number {
  if (notas.length === 0) return 0;
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}
```

```ts
// modulo-14/calculos.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { media } from "./calculos.ts";

test("calcula a média de várias notas", () => {
  assert.equal(media(6, 8, 10), 8);
});

test("retorna zero sem notas", () => {
  assert.equal(media(), 0);
});
```

Execute com `node --test modulo-14/calculos.test.ts`.

**Exercícios:**
1. Escreva testes para as funções do módulo 3 (bissexto, classificação de idade).
2. Teste que `validarIdade(-1)` lança erro usando `assert.throws`.
3. Escreva testes para `ContaCorrente`: depósito, saque dentro do limite e saque acima do limite.

**Desafio:** pratique TDD (Test Driven Development): escreva **primeiro** os testes de uma função `ehPalindromo(texto)` (ignorando espaços, acentos e maiúsculas), veja todos falharem e só então implemente.

**Leitura:** [Node.js: Test runner](https://nodejs.org/api/test.html)

---

# FASE 3: AVANÇADO

## Módulo 15: Generics

**Objetivo:** escrever funções e tipos que funcionam para **qualquer** tipo, sem perder a informação de qual tipo é.

**Conceitos:**
1. **O problema**: uma função `primeiro(lista: any[]): any` perde o tipo. Com `unknown`, você precisa verificar tudo.
2. **Parâmetro de tipo**: `function primeiro<T>(lista: T[]): T | undefined`. O `T` é uma "variável de tipo", preenchida automaticamente na chamada.
3. **Inferência de generics**: `primeiro([1, 2])` faz `T` virar `number` sozinho.
4. **Múltiplos parâmetros**: `<K, V>`.
5. **Restrições (constraints)**: `<T extends { id: number }>` exige que `T` tenha `id`.
6. **Tipos e interfaces genéricas**: `type Resposta<T> = { dados: T; erro: string | null }`.
7. **Classes genéricas**: `class Pilha<T>`.
8. **Valor padrão**: `<T = string>`.

**Exemplo:**

```ts
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n = primeiro([10, 20]);        // number | undefined
const s = primeiro(["a", "b"]);      // string | undefined

function buscarPorId<T extends { id: number }>(itens: T[], id: number): T | undefined {
  return itens.find((item) => item.id === id);
}

class Pilha<T> {
  #itens: T[] = [];
  empilhar(item: T): void { this.#itens.push(item); }
  desempilhar(): T | undefined { return this.#itens.pop(); }
  get tamanho(): number { return this.#itens.length; }
}

const pilha = new Pilha<string>();
pilha.empilhar("a");
// pilha.empilhar(1); // erro
console.log(n, s, buscarPorId([{ id: 1, nome: "Ana" }], 1)?.nome, pilha.tamanho);
```

**Exercícios:**
1. Crie `ultimo<T>(lista: T[]): T | undefined`.
2. Crie `agruparPor<T>(lista: T[], chave: (item: T) => string): Record<string, T[]>`.
3. Crie uma classe genérica `Fila<T>` (primeiro a entrar, primeiro a sair) com `enfileirar`, `desenfileirar` e `espiar`.
4. Crie `type Resultado<T, E = string>` (generalizando o do módulo 9) e reescreva `dividir` com ele.

**Desafio:** crie um `Repositorio<T extends { id: number }>` em memória com `criar`, `buscarPorId`, `listar`, `atualizar` e `remover`. Use-o para `Produto` e para `Usuario` sem duplicar código.

**Leitura:** [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

---

## Módulo 16: Criando tipos a partir de tipos (`keyof`, `typeof`, indexed access)

**Objetivo:** derivar tipos de outros tipos em vez de repeti-los.

**Conceitos:**
1. **`typeof` em nível de tipo**: pega o tipo de um **valor**: `type Config = typeof config;`
2. **`keyof`**: união das chaves de um tipo: `keyof Pessoa` vira `"nome" | "idade"`.
3. **Indexed access**: `Pessoa["nome"]` é o tipo da propriedade `nome`.
4. **Combinando**: `T[keyof T]` é a união de todos os tipos dos valores. Agora releia o exemplo do módulo 10!
5. **Generics com `keyof`**: `<T, K extends keyof T>` garante chaves válidas.

**Exemplo:**

```ts
const config = {
  porta: 3000,
  host: "localhost",
  debug: true,
};

type Config = typeof config;              // { porta: number; host: string; debug: boolean }
type ChaveConfig = keyof Config;          // "porta" | "host" | "debug"
type TipoPorta = Config["porta"];         // number

function ler<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave];
}

const porta = ler(config, "porta");       // number
// ler(config, "senha");                  // erro: chave não existe
console.log(porta);
```

**Exercícios:**
1. Crie `alterar<T, K extends keyof T>(obj: T, chave: K, valor: T[K]): T` que retorna uma cópia alterada. Teste passando um valor de tipo errado.
2. Crie `selecionar<T, K extends keyof T>(obj: T, chaves: K[])` que retorna um objeto só com as chaves pedidas.
3. A partir de um array `as const` de permissões, derive o tipo `Permissao` usando `(typeof PERMISSOES)[number]`.

**Desafio:** crie `ordenarPor<T>(lista: T[], chave: keyof T)` que ordena uma lista de objetos por qualquer propriedade.

**Leitura:** [Keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html), [Typeof](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html), [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

---

## Módulo 17: Utility types

**Objetivo:** usar os "tipos prontos" que o TypeScript oferece para transformar tipos.

**Conceitos:**
1. **`Partial<T>`**: todas as propriedades opcionais (útil para atualizações).
2. **`Required<T>`**: todas obrigatórias.
3. **`Readonly<T>`**: todas somente leitura.
4. **`Pick<T, K>`**: só algumas propriedades.
5. **`Omit<T, K>`**: todas menos algumas.
6. **`Record<K, V>`**: objeto com chaves `K` e valores `V`.
7. **`ReturnType<F>`** e **`Parameters<F>`**: extraem retorno e parâmetros de uma função.
8. **`NonNullable<T>`**, **`Exclude<T, U>`**, **`Extract<T, U>`**: operações sobre unions.
9. **`Awaited<T>`**: o tipo "de dentro" de uma Promise (módulo 19).

**Exemplo:**

```ts
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

type NovoUsuario = Omit<Usuario, "id">;
type UsuarioPublico = Pick<Usuario, "id" | "nome">;
type AtualizacaoUsuario = Partial<Omit<Usuario, "id">>;

function atualizar(u: Usuario, dados: AtualizacaoUsuario): Usuario {
  return { ...u, ...dados };
}

const notasPorAluno: Record<string, number[]> = {
  ana: [8, 9],
  bruno: [6, 7],
};

type Status = "ativo" | "inativo" | "banido";
type StatusPermitido = Exclude<Status, "banido">; // "ativo" | "inativo"
```

**Exercícios:**
1. Para o `Produto` do módulo 7, crie os tipos `NovoProduto`, `ProdutoResumo` e `AtualizacaoProduto`.
2. Crie uma função `criarUsuario(dados: NovoUsuario): Usuario` que gera o `id`.
3. Crie `type Traducoes = Record<"pt" | "en" | "es", string>` e um objeto que o satisfaça. Remova um idioma e veja o erro.
4. Use `ReturnType` para extrair o tipo de retorno de uma função sua sem reescrevê-lo.

**Desafio:** reescreva o `Repositorio<T>` do módulo 15 usando `Omit<T, "id">` em `criar` e `Partial<Omit<T, "id">>` em `atualizar`.

**Leitura:** [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

## Módulo 18: Conditional types e `infer`

**Objetivo:** criar tipos que tomam decisões, como um `if` no mundo dos tipos.

**Conceitos:**
1. **Conditional type**: `T extends U ? X : Y`, "se T cabe em U, então X, senão Y".
2. **Distribuição**: aplicado a uma union, avalia cada membro separadamente.
3. **`infer`**: "extrai" um tipo de dentro de outro durante a condição.
4. É assim que `ReturnType`, `Exclude` e outros utility types são construídos por dentro.

**Exemplo:**

```ts
type EhTexto<T> = T extends string ? "sim" : "não";
type A = EhTexto<"oi">;   // "sim"
type B = EhTexto<42>;     // "não"

type ElementoDe<T> = T extends (infer E)[] ? E : never;
type C = ElementoDe<number[]>;   // number

type MeuReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type D = MeuReturnType<() => boolean>; // boolean

type MeuExclude<T, U> = T extends U ? never : T;
type E = MeuExclude<"a" | "b" | "c", "a">; // "b" | "c"
```

**Exercícios:**
1. Crie `type SemNulo<T>` que remove `null` e `undefined` de uma union (recrie o `NonNullable`).
2. Crie `type PrimeiroParametro<F>` que extrai o tipo do primeiro parâmetro de uma função.
3. Crie `type Desembrulhar<T>` que, se `T` for array, retorna o tipo do elemento; senão, retorna o próprio `T`.

**Desafio:** crie `type RetornoAssincrono<F>` que extrai o tipo final de uma função `async` (ex.: de `() => Promise<number>` extrair `number`).

**Leitura:** [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

---

## Módulo 19: Mapped types e template literal types

**Objetivo:** gerar novos tipos percorrendo as chaves de outro, e criar tipos de texto com padrões.

**Conceitos:**
1. **Mapped type**: `{ [K in keyof T]: ... }`, como um `for` sobre as chaves de um tipo.
2. **Modificadores**: `readonly`, `?`, e removê-los com `-readonly` e `-?`.
3. **Remapeamento de chaves**: `as` dentro do mapped type para renomear chaves.
4. **Template literal types**: `` `on${string}` `` ou `` `${Cor}-${Tamanho}` ``.
5. **Manipulação de texto**: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`.

**Exemplo:**

```ts
type MeuPartial<T> = { [K in keyof T]?: T[K] };

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Pessoa { nome: string; idade: number }
type GettersPessoa = Getters<Pessoa>;
// { getNome: () => string; getIdade: () => number }

type Tamanho = "P" | "M" | "G";
type Cor = "azul" | "preto";
type SKU = `${Cor}-${Tamanho}`; // "azul-P" | "azul-M" | ... (6 combinações)

const sku: SKU = "preto-G";
```

**Exercícios:**
1. Recrie `Readonly<T>` e `Required<T>` com mapped types.
2. Crie `type Setters<T>` que gera `setNome(valor: string): void` etc.
3. Crie `type EventoDOM = "click" | "focus" | "blur"` e derive `type Handler = \`on${Capitalize<EventoDOM>}\``.
4. Crie um tipo `Rota` para URLs como `` `/usuarios/${number}` `` e teste valores válidos e inválidos.

**Desafio:** crie `type FormularioErros<T>` que transforma `{ nome: string; idade: number }` em `{ nome?: string; idade?: string }` (cada campo vira uma mensagem de erro opcional) e use no validador do módulo 13.

**Leitura:** [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html), [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

---

## Módulo 20: Programação assíncrona

**Objetivo:** lidar com operações que demoram (rede, arquivos, timers) sem travar o programa.

**Conceitos:**
1. **Síncrono vs assíncrono**: o JavaScript executa uma coisa por vez, mas pode "agendar" tarefas para depois.
2. **Callback**: função chamada quando algo termina (forma antiga).
3. **`Promise<T>`**: um valor que vai existir no futuro. Pode ser resolvida (sucesso) ou rejeitada (erro).
4. **`async` / `await`**: forma legível de esperar Promises. Uma função `async` sempre retorna `Promise`.
5. **Erros assíncronos**: `try/catch` em volta do `await`.
6. **Paralelismo**: `Promise.all` (espera todas), `Promise.allSettled` (espera todas, mesmo com falhas), `Promise.race` (a primeira que terminar).
7. **`fetch`**: requisições HTTP, já disponível no Node. O retorno de `.json()` é `any`, então **você** deve definir o tipo.
8. **Top level await**: em módulos, dá para usar `await` fora de função.

**Exemplo:**

```ts
const esperar = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

interface Usuario {
  id: number;
  name: string;
  email: string;
}

async function buscarUsuario(id: number): Promise<Usuario> {
  const resposta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
  return (await resposta.json()) as Usuario;
}

try {
  console.log("Buscando...");
  await esperar(500);
  const usuarios = await Promise.all([buscarUsuario(1), buscarUsuario(2)]);
  for (const u of usuarios) console.log(u.name, u.email);
} catch (erro) {
  console.error("Falhou:", erro instanceof Error ? erro.message : erro);
}
```

**Exercícios:**
1. Crie uma função que simula o download de 3 arquivos com tempos diferentes (`esperar`) e mostre a diferença de tempo total entre fazer em sequência (`for` com `await`) e em paralelo (`Promise.all`). Meça com `performance.now()`.
2. Busque os posts de um usuário em `https://jsonplaceholder.typicode.com/posts?userId=1`, tipe a resposta e mostre os títulos.
3. Busque o usuário 999 (não existe) e trate o erro adequadamente.
4. Use `Promise.allSettled` para buscar vários IDs, alguns inválidos, e separe sucessos de falhas.

**Desafio:** crie `comRetentativa<T>(fn: () => Promise<T>, tentativas: number): Promise<T>` que tenta de novo em caso de falha, esperando um pouco mais a cada tentativa.

**Leitura:** [MDN: Usando Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises), [MDN: async function](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)

---

# FASE 4: PROJETO FINAL

## Módulo 21: Gerenciador de tarefas no terminal

**Objetivo:** juntar tudo em uma aplicação real.

**Requisitos:**
1. Menu interativo no terminal (veja o apêndice A para ler o teclado).
2. Comandos: adicionar, listar, concluir, remover, filtrar por status e por prioridade.
3. Cada tarefa tem: `id`, `titulo`, `descricao` opcional, `prioridade` (`"baixa" | "media" | "alta"`), `status` (discriminated union, por exemplo `{ estado: "pendente" } | { estado: "concluida"; concluidaEm: string }`), `criadaEm`.
4. Persistência em `tarefas.json` usando `node:fs/promises` (carrega ao iniciar e salva a cada alteração).
5. Validação de entrada com erros customizados.
6. Código organizado em módulos: `tipos.ts`, `repositorio.ts`, `servico.ts`, `cli.ts`, `main.ts`.
7. Testes para o serviço (adicionar, concluir, filtrar).
8. `npm run check` sem nenhum erro.

**Conceitos aplicados por módulo:**

| Parte do projeto | Módulos |
|------------------|---------|
| Tipos da tarefa e status | 7, 8, 9, 10 |
| Repositório genérico | 15, 17 |
| Serviço e regras | 6, 11, 13 |
| Arquivos e modularização | 12, 20 |
| Testes | 14 |

**Extras opcionais:** datas de vencimento com alerta de atrasadas; exportar relatório em Markdown; desfazer a última ação (use a `Pilha<T>` do módulo 15).

---

# APÊNDICES

## A. Lendo entrada do teclado

Útil para deixar qualquer exercício interativo:

```ts
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const nome = await rl.question("Qual é o seu nome? ");
const idadeTexto = await rl.question("Qual é a sua idade? ");
rl.close();

const idade = Number(idadeTexto); // tudo que vem do teclado é string!
console.log(`${nome} tem ${idade} anos`);
```

## B. Limitações do Node que você vai encontrar

O Node executa TypeScript apenas **apagando** os tipos. Recursos que precisam **gerar** código JavaScript dão erro:

| Recurso | Alternativa |
|---------|-------------|
| `enum` | Union de literais ou objeto `as const` (módulo 10) |
| `namespace` com código | Módulos com `import`/`export` (módulo 12) |
| Parameter properties (`constructor(private x: number)`) | Declarar a propriedade e atribuir no construtor (módulo 11) |
| Decorators | Ainda não suportados; teste no Playground se tiver curiosidade |
| Import sem extensão (`"./arquivo"`) | Sempre `"./arquivo.ts"` |
| Importar tipo sem `type` | `import type { X }` |

O `erasableSyntaxOnly` e o `verbatimModuleSyntax` do `tsconfig.json` fazem o VS Code avisar sobre todos esses casos antes de você executar.

## C. Checklist de progresso

- [x] Fase 0: Ambiente
- [x] Módulo 1: Variáveis e tipos primitivos
- [x] Módulo 2: Operadores e expressões
- [ ] Módulo 3: Condições
- [ ] Módulo 4: Loops
- [ ] Módulo 5: Arrays e tuplas
- [ ] Módulo 6: Funções
- [ ] Módulo 7: Objetos, type e interface
- [ ] Módulo 8: Union, literal types e null
- [ ] Módulo 9: Narrowing
- [ ] Módulo 10: Enums e alternativas
- [ ] Módulo 11: Classes
- [ ] Módulo 12: Módulos
- [ ] Módulo 13: Tratamento de erros
- [ ] Módulo 14: Testes
- [ ] Módulo 15: Generics
- [ ] Módulo 16: keyof, typeof, indexed access
- [ ] Módulo 17: Utility types
- [ ] Módulo 18: Conditional types
- [ ] Módulo 19: Mapped e template literal types
- [ ] Módulo 20: Assincronismo
- [ ] Módulo 21: Projeto final

---

## Fontes

- [The TypeScript Handbook (documentação oficial)](https://www.typescriptlang.org/docs/handbook/intro.html): estrutura e ordem dos tópicos das fases 2 e 3.
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/): significado das opções do `tsconfig.json`.
- [Node.js: Modules: TypeScript](https://nodejs.org/api/typescript.html): `tsconfig` recomendado, recursos não suportados, extensões obrigatórias e `import type`.
- [Node.js: Test runner](https://nodejs.org/api/test.html): módulo 14.
- [MDN Web Docs: Guia de JavaScript (pt-BR)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide): fundamentos da fase 1, que o próprio Handbook recomenda estudar pela MDN.
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/): API pública gratuita usada nos exercícios do módulo 20.
