# Gestão de Atividades API

API RESTful para gerenciamento colaborativo de atividades organizadas por projetos, construída com NestJS, Prisma e PostgreSQL.

## O que é o projeto

A **Gestão de Atividades API** é o backend de um sistema que permite que equipes organizem e acompanhem o andamento de tarefas dentro de projetos compartilhados. Cada usuário pode criar projetos, convidar participantes e cadastrar atividades com prioridade, prazo de vencimento, subtarefas (hierarquia entre atividades) e tags para categorização.

## Por que esse projeto existe

Em muitos times, o trabalho em conjunto perde eficiência por falta de um local único para acompanhar quem está fazendo o quê e qual é a prioridade de cada tarefa. Este projeto existe para **facilitar o trabalho em equipe e agilizar o processo de realização de projetos**, oferecendo uma estrutura simples de projetos → atividades → participantes, com autenticação e controle de acesso, para que equipes possam colaborar de forma organizada.

## Como usar

Após subir a aplicação (veja [Instalação](#instalação)), a API expõe endpoints REST autenticados via JWT. O fluxo básico é:

1. Registrar um usuário (`POST /auth/register`) e autenticar (`POST /auth/login`) para obter o token JWT.
2. Usar o token no header `Authorization: Bearer <token>` nas próximas requisições.
3. Criar um projeto (`POST /projeto`) e adicionar participantes a ele.
4. Criar atividades dentro do projeto, definindo prioridade, data de vencimento e, opcionalmente, subtarefas e tags.
5. Consultar, atualizar ou remover atividades e projetos conforme o andamento do trabalho.

A documentação interativa dos endpoints (Swagger) fica disponível em `http://localhost:3000/docs` com a aplicação rodando.

## Funcionalidades

- **Autenticação de usuários** com registro, login e senha criptografada (JWT + Bcrypt)
- **CRUD de usuários** (consulta, atualização e remoção de dados do próprio usuário)
- **CRUD de projetos**, incluindo gerenciamento de participantes (adicionar, listar e remover)
- **CRUD de atividades** vinculadas a um projeto, com:
  - Prioridade (`URGENTE`, `ALTA`, `MEDIA`, `BAIXA`)
  - Data de vencimento
  - Texto/descrição da atividade
  - Hierarquia entre atividades (subtarefas de uma atividade "pai")
  - Associação de tags
- **CRUD de tags** para categorizar atividades, com busca por nome e por id
- **Documentação automática da API** via Swagger

## Tecnologias

- [NestJS](https://nestjs.com/) — framework Node.js para aplicações backend
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/) — mapeamento objeto-relacional
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional
- [JWT](https://jwt.io/) — autenticação e autorização
- [Bcrypt](https://www.npmjs.com/package/bcrypt) — criptografia de senhas
- [Swagger](https://swagger.io/) (`@nestjs/swagger`) — documentação da API
- [Jest](https://jestjs.io/) — testes automatizados
- [Docker Compose](https://docs.docker.com/compose/) — orquestração do banco de dados em desenvolvimento

## Arquitetura

O projeto segue a organização modular do NestJS, dividido por domínio, com um padrão de repositório para desacoplar o acesso a dados (Prisma) da camada de serviço:

- **Módulos por domínio**: `auth`, `users`, `projeto`, `atividade` e `tags`, cada um com seu próprio controller, service, DTOs e entidade.
- **Padrão Repository**: cada domínio possui uma interface de repositório (`i<entidade>.repository.ts`) e uma implementação (`<entidade>.repository.ts`), isolando as chamadas ao Prisma da lógica de negócio dos services.
- **Autenticação centralizada**: um `AuthGuard` global protege as rotas, com um decorator (`@Public`) para marcar endpoints públicos, como registro e login.
- **Modelo de dados relacional**:
  - `user` N:N `projeto` (participantes de um projeto)
  - `projeto` 1:N `atividade`
  - `atividade` com auto-relacionamento (`pai`/`subtarefas`) para hierarquia de tarefas
  - `atividade` N:N `tags`, e cada `tags` pertence a um `user` criador
- **Validação e transformação** de entrada via `ValidationPipe` global (`whitelist`, `forbidNonWhitelisted`, `transform`)
- **CORS** habilitado para o frontend (`http://localhost:4200`)

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Docker](https://www.docker.com/) e Docker Compose (para subir o PostgreSQL) — ou uma instância PostgreSQL própria

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/Murilo-Barbiere/Gestao-de-atividades-API.git
   cd Gestao-de-atividades-API
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Suba o banco de dados PostgreSQL com Docker Compose:
   ```bash
   docker compose up -d
   ```

4. Crie o arquivo `.env` na raiz do projeto (veja a seção [Configuração](#configuração)).

5. Rode as migrações do Prisma e gere o client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. Inicie a aplicação em modo desenvolvimento:
   ```bash
   npm run start:dev
   ```

A API sobe, por padrão, em `http://localhost:3000`, e a documentação Swagger fica em `http://localhost:3000/docs`.

## Configuração

O projeto usa variáveis de ambiente definidas em um arquivo `.env` na raiz. Exemplo:

```dotenv
DATABASE_URL="SUA_URL"
SECRET_JWT = "SUA_CHAVE"
SALT_ROUNDS = 10
```

- **`DATABASE_URL`**: string de conexão do Prisma com o PostgreSQL, no formato `postgresql://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>?schema=public`. O valor de exemplo aponta para a porta `5433`, que é a porta exposta pelo `compose.yaml` deste projeto (mapeada para a `5432` interna do container).
- **`SECRET_JWT`**: chave secreta usada para assinar e validar os tokens JWT gerados no login. Deve ser um valor forte e mantido em segredo, especialmente em produção.
- **`SALT_ROUNDS`**: número de rounds usados pelo Bcrypt ao gerar o hash das senhas dos usuários. Quanto maior o valor, mais segura (e mais lenta) é a criptografia. `10` é um valor comum e equilibrado.

> Nunca commite o arquivo `.env` real no repositório. Use um `.env.example` como referência para outros desenvolvedores.

## Estrutura do projeto

```
Gestao-de-atividades-API/
├── prisma/
│   ├── migrations/          
│   └── schema.prisma       
├── src/
│   ├── atividade/          
│   ├── auth/               
│   ├── common/
│   │   └── enums/         
│   ├── prisma/              
│   ├── projeto/             
│   ├── tags/                 
│   ├── users/                 
│   ├── app.module.ts        
│   └── main.ts            
├── test/                 
├── compose.yaml      
├── package.json
└── .env                    
```

Cada módulo de domínio (`atividade`, `auth`, `projeto`, `tags`, `users`) segue o mesmo padrão interno:

```
<modulo>/
├── dto/                     # Objetos de transferência de dados (create, update, response)
├── entity/                  # Entidade do domínio
├── repository/              # Interface + implementação de acesso a dados (Prisma)
├── <modulo>.controller.ts   
├── <modulo>.module.ts     
└── <modulo>.service.ts     
```
