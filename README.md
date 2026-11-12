# Aplicativo de Hábitos

Criei este projeto para acompanhar hábitos do dia a dia: posso cadastrar atividades, marcar o que concluí e visualizar meu progresso. A aplicação combina uma interface React com uma API própria e persiste os dados em um banco SQLite.

> **Sobre o escopo:** embora este repositório tenha sido descrito como um projeto de e-commerce, o código que encontrei implementa um aplicativo de acompanhamento de hábitos. Não há catálogo de produtos, carrinho, pedidos ou pagamento.

## Funcionalidades

- Cadastro de hábitos com nome.
- Edição e exclusão de hábitos pelo menu de contexto (clique com o botão direito sobre um hábito).
- Marcação e desmarcação da conclusão diária.
- Marcação de hábitos como importantes e página dedicada a eles.
- Exibição da sequência de dias consecutivos (*streak*) de cada hábito.
- Resumo diário com quantidade e porcentagem de hábitos concluídos.
- Calendário mensal com a porcentagem de conclusão por dia e navegação entre meses.
- API com dados estatísticos diários e semanais.

O histórico de conclusão é salvo por data. Ao excluir um hábito pela API, a aplicação registra a data da exclusão e remove o registro de conclusão do dia atual. O banco também define uma exclusão em cascata para os registros quando um hábito é removido fisicamente.

## Tecnologias e ferramentas

| Tecnologia | Uso no projeto |
| --- | --- |
| JavaScript e JSX | Linguagem do frontend e do backend. |
| React 19 | Construção da interface em componentes. |
| React Router 7 | Navegação entre as telas de hábitos e hábitos importantes. |
| Node.js | Execução da API. |
| Express 5 | Servidor HTTP e rotas da API REST. |
| Knex 3 | Consultas e configuração do acesso ao banco. |
| SQLite 3 | Persistência local em `server/data/habitos.db3`. |
| Vite 8 | Servidor de desenvolvimento e geração do build do frontend. |
| Tailwind CSS 4 | Estilos utilitários, integrado ao Vite. |
| Oxlint | Verificação estática do frontend. |

O projeto não declara uma versão mínima de Node.js (`engines`) nos manifests. A versão disponível durante a análise foi Node.js 22.18.0 e npm 10.9.3; essa informação descreve o ambiente da análise, não uma versão fixada pelo projeto.

## Dependências

As versões abaixo mostram a faixa declarada no `package.json` e a versão exata registrada no respectivo `package-lock.json`. Para instalar as versões travadas, use `npm install` dentro de cada pasta (`server` e `web`).

### Backend — dependências de produção

| Dependência | Declarada | Travada | Finalidade |
| --- | --- | --- | --- |
| `cors` | `^2.8.6` | `2.8.6` | Permite requisições entre origens na API Express. |
| `dotenv` | `^17.4.2` | `17.4.2` | Biblioteca para carregar variáveis de um arquivo `.env`; não encontrei seu uso no código atual. |
| `express` | `^5.2.1` | `5.2.1` | Servidor HTTP e definição das rotas. |
| `knex` | `^3.3.0` | `3.3.0` | Construtor de consultas e gerenciamento de migrações. |
| `sqlite3` | `^6.0.1` | `6.0.1` | Driver SQLite usado pelo Knex no ambiente de desenvolvimento. |

### Backend — dependências de desenvolvimento

| Dependência | Declarada | Travada | Finalidade |
| --- | --- | --- | --- |
| `nodemon` | `^3.1.14` | `3.1.14` | Reinicia a API durante o desenvolvimento; usado pelo script `dev`. |

### Frontend — dependências de produção

| Dependência | Declarada | Travada | Finalidade |
| --- | --- | --- | --- |
| `@tailwindcss/vite` | `^4.3.4` | `4.3.4` | Integra o Tailwind CSS ao Vite. |
| `axios` | `^1.19.0` | `1.19.0` | Cliente HTTP disponível no projeto; as chamadas encontradas atualmente usam `fetch`. |
| `lucide-react` | `^1.72.0` | `1.72.0` | Ícones React, incluindo o ícone do menu lateral. |
| `react` | `^19.2.8` | `19.2.8` | Biblioteca principal da interface. |
| `react-dom` | `^19.2.8` | `19.2.8` | Renderização da aplicação no navegador. |
| `react-router` | `^7.18.2` | `7.18.2` | Rotas e links de navegação. |
| `recharts` | `^3.10.1` | `3.10.1` | Gráficos; há componentes de gráficos semanais e mensais no código, mas eles não são montados nas rotas atuais. |
| `tailwindcss` | `^4.3.4` | `4.3.4` | Estilização utilitária e base dos estilos da aplicação. |

### Frontend — dependências de desenvolvimento

| Dependência | Declarada | Travada | Finalidade |
| --- | --- | --- | --- |
| `@types/react` | `^19.2.17` | `19.2.18` | Definições TypeScript para React; o código da aplicação está em JavaScript/JSX. |
| `@types/react-dom` | `^19.2.3` | `19.2.4` | Definições TypeScript para React DOM; o código da aplicação está em JavaScript/JSX. |
| `@vitejs/plugin-react` | `^6.0.4` | `6.0.5` | Suporte a React no Vite. |
| `nodemon` | `^3.1.14` | `3.1.14` | Também está listado no frontend, mas não é usado pelos scripts dessa pasta. |
| `oxlint` | `^1.75.0` | `1.78.0` | Linter executado pelo script `lint`. |
| `vite` | `^8.2.0` | `8.2.1` | Ferramenta de desenvolvimento, build e pré-visualização do frontend. |

## Pré-requisitos

- Git.
- Node.js e npm.
- Duas janelas de terminal para executar a interface e a API em paralelo durante o desenvolvimento.

Não encontrei versão de Node.js ou npm fixada pelo projeto. A API usa SQLite e o repositório inclui o arquivo `server/data/habitos.db3`.

## Instalação e execução em desenvolvimento

### 1. Clonar o repositório

```bash
git clone https://github.com/Devpdias/Aplicativo-de-habitos.git
cd Aplicativo-de-habitos
```

### 2. Instalar as dependências da API

No primeiro terminal, a partir da raiz do repositório:

```bash
cd server
npm install
npm run dev
```

A API inicia na porta `3220`. Mantenha esse terminal aberto. É importante iniciar o processo dentro de `server`, pois o caminho do banco SQLite é relativo a essa pasta.

### 3. Instalar as dependências da interface

No segundo terminal, volte à raiz do repositório e inicie o frontend:

```bash
cd web
npm install
npm run dev
```

O Vite informa no terminal o endereço local da interface. Com a configuração padrão, acesse:

- Hábitos: <http://localhost:5173/habitos>
- Hábitos importantes: <http://localhost:5173/importantes>

O frontend usa chamadas `fetch` para `http://localhost:3220`; por isso, a API precisa estar em execução na porta esperada. A aplicação não define uma rota para `/`.

### Banco de dados e migrações

O arquivo SQLite está incluído no repositório. O Knex tem migrações em `server/data/migrations`, mas não encontrei script de migração nem execução automática dessas migrações ao iniciar a API. Para o fluxo documentado, mantenha o banco versionado no local esperado; não apague nem mova esse arquivo.

## Configuração de ambiente

Não encontrei arquivos `.env`, referências a `process.env` nem configuração de variáveis de ambiente usada pela aplicação. O pacote `dotenv` está listado no backend, mas não é carregado pelo código atual.

A porta da API (`3220`), o endereço da API usado pelo frontend (`http://localhost:3220`) e a configuração SQLite estão definidos diretamente no código/configuração. Não há um mecanismo documentado para alterá-los por variável de ambiente.

## Scripts disponíveis

Execute cada comando no diretório indicado:

| Pasta | Comando | O que faz |
| --- | --- | --- |
| `server` | `npm run dev` | Inicia `server.js` com Nodemon para desenvolvimento. |
| `web` | `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `web` | `npm run build` | Gera a versão compilada do frontend em `web/dist`. |
| `web` | `npm run preview` | Serve localmente o build do Vite para pré-visualização. |
| `web` | `npm run lint` | Executa Oxlint no frontend. |

Não há script `build`, `start`, `test` ou `migrate` no `package.json` do backend, nem script de testes declarado no frontend.

## Build e execução para pré-visualização

Para gerar e pré-visualizar a interface compilada, execute na pasta `web`:

```bash
npm run build
npm run preview
```

O Vite informa o endereço da pré-visualização; a porta padrão é `4173`. A API continua sendo um processo separado. Para iniciá-la sem Nodemon, abra outro terminal na pasta `server` e execute:

```bash
node server.js
```

**Limite importante:** essa pré-visualização permite conferir o build localmente, mas não equivale a uma configuração de implantação de produção. Embora `knexfile.js` contenha seções chamadas `staging` e `production`, elas usam credenciais PostgreSQL genéricas de exemplo, e `server/habitos.js` seleciona explicitamente a configuração `development` com SQLite. Não encontrei instruções, scripts ou configuração de produção completa para publicar a aplicação.

## API

A API Express é montada sob o prefixo `/habitos`. As rotas encontradas são:

| Método | Caminho | Descrição |
| --- | --- | --- |
| `GET` | `/habitos` | Lista hábitos ativos e informa se cada um foi concluído hoje. |
| `POST` | `/habitos` | Cria um hábito. Recebe JSON no formato `{"nome":"Ler"}`. |
| `PATCH` | `/habitos/:id` | Altera o nome. Recebe JSON no formato `{"novoNome":"Ler"}`. |
| `DELETE` | `/habitos/:id` | Exclui logicamente o hábito. |
| `PATCH` | `/habitos/:id/registros` | Alterna a conclusão do hábito na data atual. |
| `PATCH` | `/habitos/:id/importante` | Alterna a marcação de importante. |
| `GET` | `/habitos/importantes` | Lista hábitos ativos marcados como importantes. |
| `GET` | `/habitos/:id/streak` | Retorna a sequência de conclusões do hábito. |
| `GET` | `/habitos/estatisticas/dias` | Retorna o resumo de conclusão do dia atual. |
| `GET` | `/habitos/estatisticas/semana` | Retorna estatísticas diárias da semana até a data atual. |
| `GET` | `/habitos/estatisticas/mes?ano=AAAA&mes=M` | Retorna estatísticas diárias do mês informado. |

Não encontrei autenticação, integração com serviços externos ou funcionalidades de pagamento.

## Estrutura do projeto

```text
.
├── server/
│   ├── data/
│   │   ├── habitos.db3
│   │   └── migrations/
│   ├── habitos.js
│   ├── knexfile.js
│   ├── package.json
│   └── server.js
└── web/
    ├── src/
    │   ├── components/
    │   ├── estilos/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

| Caminho | Responsabilidade |
| --- | --- |
| `server/server.js` | Cria o servidor Express, habilita CORS e JSON e registra as rotas de hábitos. |
| `server/habitos.js` | Implementa operações de hábitos, registros, marcação de importantes, sequências e estatísticas. |
| `server/knexfile.js` | Configura o Knex, o arquivo SQLite e os diretórios de migração e seeds. |
| `server/data/habitos.db3` | Banco SQLite incluído no repositório. |
| `server/data/migrations/` | Histórico de alterações do esquema das tabelas. |
| `web/src/main.jsx` | Ponto de entrada que monta a aplicação React. |
| `web/src/App.jsx` | Define o roteamento para as páginas de hábitos e importantes. |
| `web/src/components/` | Componentes de layout, navegação, hábitos, calendário e estatísticas. |
| `web/src/estilos/App.css` | Estilos da interface e importação do Tailwind CSS. |
| `web/vite.config.js` | Configura os plugins React e Tailwind para o Vite. |
| `web/index.html` | Documento HTML inicial do frontend. |

## Organização e arquitetura

Organizei o repositório em dois projetos independentes, cada um com seu próprio `package.json` e arquivo de lock:

1. **Frontend (`web`)**: a entrada React carrega as rotas e os componentes de interface. Os componentes consultam a API usando `fetch`.
2. **Backend (`server`)**: o Express atende as requisições sob `/habitos`; o roteador usa Knex para ler e gravar dados no SQLite.
3. **Persistência**: a tabela `habitos` guarda os hábitos e metadados, enquanto `registros` guarda a conclusão por data. As migrações registram a evolução desse esquema.

Em termos de fluxo, a interface envia uma requisição HTTP para a API; a API consulta ou atualiza o SQLite e devolve JSON para a interface.

## Melhorias futuras

Como próximos passos, eu poderia:

- centralizar a URL da API e as portas em uma configuração apropriada por ambiente;
- definir e documentar uma configuração real de produção para o backend e o banco;
- incluir scripts de migração e testes automatizados;
- conectar à interface os componentes de gráficos já existentes ou remover o que não for utilizado;
- avaliar autenticação e outros recursos de conta, caso façam parte do escopo futuro.

Esses itens são sugestões de evolução; não fazem parte das funcionalidades que confirmei no código atual.

## Autor e repositório

Desenvolvi este projeto e mantenho o código no GitHub:

- **Autor:** [@Devpdias](https://github.com/Devpdias)
- **Repositório:** [Devpdias/Aplicativo-de-habitos](https://github.com/Devpdias/Aplicativo-de-habitos)

