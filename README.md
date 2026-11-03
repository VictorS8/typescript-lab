# typescript-lab

Laboratório de estudo de TypeScript: um repositório onde aprendo a linguagem escrevendo exercícios de verdade, do zero ao avançado.

## Motivação

Aprender TypeScript praticando, um conceito por vez: primeiro os fundamentos de programação (variáveis, condições, loops, funções), depois o sistema de tipos (unions, narrowing, generics, utility types) e, no fim, um projeto completo de linha de comando.

Quem manda na ordem do estudo é o [roteiro-typescript.md](roteiro-typescript.md), com 4 fases e 21 módulos. Este README não repete o roteiro: ele só explica como o repositório funciona e como rodar o projeto.

**Objetivo:** entender os conceitos, e não só fazer o código rodar. Por isso a IA que acompanha o estudo segue as regras do [AGENTS.md](AGENTS.md): ela corrige, explica o porquê e mostra alternativas, mas não edita os exercícios. A correção é digitada à mão.

## Onde se pratica

Cada exercício tem um lugar fixo e um nome previsível: uma pasta por módulo e um arquivo por exercício do roteiro.

| Fase | Módulos | Pasta e arquivos |
|------|---------|------------------|
| 0. Ambiente | 0 | `modulo-00/teste.ts` |
| 1. Fundamentos | 1 a 7 | `modulo-01/ex1.ts` ... `modulo-07/desafio.ts` |
| 2. Sistema de tipos | 8 a 14 | `modulo-08/ex1.ts` ... `modulo-14/` |
| 3. Avançado | 15 a 20 | `modulo-15/ex1.ts` ... `modulo-20/desafio.ts` |
| 4. Projeto final | 21 | `modulo-21/` |

```
modulo-01/
  ex1.ts
  ex2.ts
  desafio.ts
modulo-02/
  ex1.ts
  ...
```

Nos módulos 12, 14 e 21, um exercício tem vários arquivos. Nesses casos, cada exercício ganha uma subpasta, como `modulo-12/ex1/utils.ts` e `modulo-12/ex1/main.ts`.

**Prática extra (opcional):** depois de terminar um módulo, dá para reforçar com o [Exercism (trilha de TypeScript)](https://exercism.org/tracks/typescript), para lógica (fase 1), e com o [type-challenges](https://github.com/type-challenges/type-challenges), para o sistema de tipos (fases 2 e 3).

## Tecnologias

| Ferramenta | Versão | Para quê |
|------------|--------|----------|
| [Node.js](https://nodejs.org) | 26.x (mínimo 22.18) | Executa os arquivos `.ts` direto, apagando os tipos |
| [TypeScript](https://www.typescriptlang.org) | 7.0.2 | Dá o comando `tsc`, que verifica os tipos (`npm run check`) |
| [@types/node](https://www.npmjs.com/package/@types/node) | 26.6.4 | Tipos das funções do próprio Node |
| [node:test](https://nodejs.org/api/test.html) | embutido no Node | Testes automatizados, sem instalar nada (módulo 14) |

As versões do TypeScript e do `@types/node` ficam travadas no `package-lock.json`. Por isso, ao chegar numa máquina nova, use `npm ci`: ele instala exatamente essas versões, e o ambiente fica igual em todas as máquinas.

Não precisa de Docker, navegador nem bundler. O Node executa TypeScript removendo os tipos ([Node.js: TypeScript](https://nodejs.org/api/typescript.html)). Essa remoção não aceita sintaxes que geram código, como `enum` e `namespace` com código, e o `tsconfig.json` avisa no editor quando você usa uma delas (veja o Apêndice B do roteiro).

## Primeira vez

**1. Instale o Node** (só o passo de instalação muda entre os sistemas):

| Sistema | Comando |
|---------|---------|
| Linux (Omarchy/Arch) | `sudo pacman -S nodejs npm`, ou pelo gerenciador de versões que você já usa |
| Windows | `winget install OpenJS.NodeJS.LTS` |
| macOS | `brew install node` |

Depois **feche todas as janelas do VS Code**, abra de novo e confira:

```bash
node -v   # 22.18 ou mais recente; de preferência a mesma versão em todas as máquinas
npm -v
```

**2. Instale as dependências e confira os tipos** (igual nos três sistemas):

```bash
npm ci
npm run check
```

Se o `npm run check` terminar sem mostrar nenhum erro, o ambiente está pronto.

## Rotina

Os comandos são os mesmos no Linux, no Windows e no macOS:

```bash
node modulo-01/ex1.ts                      # executa um exercício
npm run check                              # verifica os tipos de todos os arquivos
node --test modulo-14/calculos.test.ts     # roda os testes de um arquivo (módulo 14)
```

O Node **executa** mesmo com erro de tipo, porque ele só apaga os tipos, sem verificar. Por isso rode `npm run check` antes de considerar um exercício pronto.

No Windows, o terminal do VS Code é o PowerShell. O PowerShell 5.1, que é o padrão do Windows, não tem `&&`. Rode um comando por vez.

## Problemas comuns

| Erro | Como resolver | Fonte |
|------|---------------|-------|
| `npm` não é reconhecido (Windows) | O VS Code guardou o `PATH` de antes da instalação. Feche **todas** as janelas dele e abra de novo | [Variáveis de ambiente no PowerShell](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_environment_variables) |
| `npm.ps1` não pode ser carregado (Windows) | Rode uma vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. Vale só para o seu usuário e não pede administrador | [Políticas de execução do PowerShell](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_execution_policies) |
| `'tsc' não é reconhecido` | Falta a pasta `node_modules`. Rode `npm ci` | [npm ci](https://docs.npmjs.com/cli/commands/npm-ci) |
| `node arquivo.ts` dá erro de sintaxe logo nos tipos | O Node é antigo demais para executar `.ts`. Atualize para a versão 22.18 ou mais recente | [Node.js: TypeScript](https://nodejs.org/api/typescript.html) |
| Linha lida de arquivo vem com `\r` no fim (Windows) | O arquivo está em CRLF. Use `split(/\r?\n/)` | Roteiro, Módulo 12 |

Mais detalhes no Apêndice D do [roteiro](roteiro-typescript.md).
