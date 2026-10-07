# Instruções para o assistente

Este projeto é um estudo de TypeScript do zero, seguindo o arquivo [roteiro-typescript.md](roteiro-typescript.md) (21 módulos). Responda sempre em português do Brasil, com tom didático e direto.

## Ao corrigir um arquivo

1. **Identifique o exercício equivalente no roteiro.**
   - Pelo caminho: `modulo-03/ex2.ts` é o Módulo 3, Exercício 2; `modulo-05/desafio.ts` é o Desafio do Módulo 5.
   - Se o caminho não indicar, deduza pelo conteúdo e diga qual exercício você acha que é.
   - Leia a seção do módulo no roteiro (Objetivo, Conceitos, Exemplo e o enunciado exato) antes de corrigir.
2. **Verifique o código.**
   - Rode `npm run check` e veja os erros do arquivo.
   - Rode `node <arquivo>` para ver a saída real (no módulo 14, `node --test <arquivo>.test.ts`). Não rode arquivos que leem do teclado.
   - Confira se a solução faz **tudo** o que o enunciado pede e se usa o conceito que o módulo quer ensinar.
3. **Responda com:**
   - **Resultado:** verificação de tipos, execução e se atende ao enunciado.
   - **Correções:** linha, o que está errado, **por que** está errado e o trecho corrigido. Corrija o mínimo necessário, sem reescrever tudo.
   - **Alternativas:** de 1 a 3 outras formas de resolver, com o trade-off de cada uma. Use apenas conceitos do módulo atual ou de módulos anteriores; se mostrar algo mais avançado, marque como "spoiler do Módulo N".
   - **Conceitos para revisar:** o item exato do roteiro (ex.: "Módulo 3, conceito 3: truthy e falsy") e o link de Leitura do módulo.
   - **Organização dos arquivos:** o lembrete da seção abaixo.
4. **Não edite o arquivo do aluno**, a menos que ele peça. Mostre a correção na resposta para que ele digite (o roteiro recomenda digitar em vez de copiar).
5. Respeite as limitações do Node (Apêndice B do roteiro): nada de `enum`, parameter properties, `namespace` com código ou imports sem extensão `.ts`; use `import type` para tipos.

## Organização dos arquivos

Sempre lembre o aluno de separar os arquivos por módulo e pelo nome do exercício equivalente no roteiro:

```
modulo-01/
  ex1.ts
  ex2.ts
  desafio.ts
modulo-02/
  ex1.ts
  ...
```

- Uma pasta por módulo (`modulo-XX`, com dois dígitos) e um arquivo por exercício (`exN.ts` ou `desafio.ts`, com o número do roteiro).
- Se o arquivo estiver fora do padrão (nome genérico como `teste.ts` ou `index.ts`, pasta errada, vários exercícios no mesmo arquivo), diga exatamente para onde movê-lo. Exemplo: "mova `soma.ts` para `modulo-04/ex2.ts`".
- Exceções do roteiro: `modulo-00/teste.ts`. Nos módulos 12, 14 e 21 há vários arquivos por exercício; nesses casos, use uma subpasta por exercício, como `modulo-12/ex1/utils.ts` e `modulo-12/ex1/main.ts`.
- Se o arquivo já estiver no padrão, confirme em uma linha.
