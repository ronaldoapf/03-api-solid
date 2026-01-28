# 🚀 API REST com Node.js

> Repositório de estudos do Módulo 2 do curso de Node.js da Rocketseat

## 📋 Sobre

Este repositório foi criado exclusivamente para fins educacionais, contendo os códigos e exercícios desenvolvidos durante as aulas do **Módulo 3** do curso de Node.js da **Rocketseat**. O objetivo é aplicar os conceitos de desenvolvimento de APIs RESTful utilizando Node.js e suas principais ferramentas do ecossistema.

Para o desenvolvimento da aula, neste módulo é desenvolvido uma aplicação backend no estilo Gympass, onde um usuário pode realizar check-in em academias.

## 🛠️ Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Fastify](https://www.fastify.io/)** - Framework web rápido e eficiente
- **[TSX](https://github.com/esbuild-kit/tsx)** - Executor TypeScript para Node.js
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript

## 🗄️ Prisma ORM

O **Prisma** é um ORM (Object-Relational Mapping) de próxima geração para Node.js e TypeScript. Ele simplifica o trabalho com bancos de dados, oferecendo uma experiência de desenvolvedor excepcional através de:

- **Type-Safety**: Auto-complete e validação de tipos em tempo de desenvolvimento
- **Prisma Schema**: Modelagem de dados declarativa e intuitiva
- **Prisma Client**: Cliente de banco de dados auto-gerado e type-safe
- **Prisma Migrate**: Sistema de migração de banco de dados

### 📝 Schema do Prisma

O Prisma utiliza um arquivo `schema.prisma` para definir:
- A conexão com o banco de dados
- Os modelos de dados da aplicação
- As relações entre as tabelas

### 🔄 Migrations com Prisma

As migrations são uma forma de versionar e controlar as mudanças no esquema do banco de dados.

#### Criar uma nova migration

Após modificar o arquivo `schema.prisma`, execute:

```bash
npx prisma migrate dev
```

Este comando irá:
1. Criar uma nova migration baseada nas mudanças do schema
2. Aplicar a migration no banco de dados
3. Gerar o Prisma Client atualizado

#### Aplicar migrations em produção

Para aplicar as migrations em ambiente de produção:

```bash
npx prisma migrate deploy
```

#### Verificar o status das migrations

Para verificar quais migrations foram aplicadas:

```bash
npx prisma migrate status
```

#### Resetar o banco de dados (apenas desenvolvimento)

Para resetar o banco de dados e aplicar todas as migrations novamente:

```bash
npx prisma migrate reset
```

⚠️ **Atenção**: Este comando apaga todos os dados do banco de dados!

#### Visualizar os dados com Prisma Studio

O Prisma oferece uma interface visual para visualizar e editar dados:

```bash
npx prisma studio
```

### 📚 Comandos úteis do Prisma

```bash
# Gerar Prisma Client após mudanças no schema
npx prisma generate

# Formatar o arquivo schema.prisma
npx prisma format

# Criar o banco de dados (se não existir)
npx prisma db push

# Fazer seed do banco de dados
npx prisma db seed
```
