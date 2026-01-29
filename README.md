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

## 🎮 Controllers

O **Controller** é um componente fundamental na arquitetura de uma aplicação backend. Ele atua como um intermediário entre as rotas da API e a lógica de negócio da aplicação.

### O que é um Controller?

Um Controller é uma classe ou conjunto de funções responsáveis por:

- **Receber requisições HTTP**: Interceptar os dados enviados pelo cliente
- **Validar dados**: Garantir que os dados recebidos estão no formato esperado
- **Processar a lógica**: Chamar serviços e casos de uso para realizar operações
- **Retornar respostas**: Enviar os dados processados de volta ao cliente em formato padronizado

### Responsabilidades do Controller

```javascript
// Exemplo simplificado de um Controller
class UserController {
  // 1. Receber dados da requisição
  async create(request, reply) {
    const { name, email, password } = request.body
    
    // 2. Validar dados
    if (!name || !email || !password) {
      return reply.status(400).send({ error: 'Missing fields' })
    }
    
    // 3. Processar a lógica chamando um serviço
    const user = await createUserService.execute({
      name,
      email,
      password
    })
    
    // 4. Retornar resposta
    return reply.status(201).send(user)
  }
}
```

### Boas práticas com Controllers

✅ **Mantenha controllers magros**: Coloque a lógica complexa em serviços ou casos de uso  
✅ **Separe responsabilidades**: Um controller deve fazer uma coisa bem  
✅ **Valide sempre**: Verifique os dados de entrada antes de processar  
✅ **Trate erros**: Implemente tratamento de exceções apropriado  
✅ **Use tipos**: Em TypeScript, defina interfaces para requisições e respostas  

## 🎯 Use Cases

Um **Use Case** (Caso de Uso) representa uma funcionalidade específica da aplicação. É onde reside a **lógica de negócio**, separada totalmente da camada HTTP (controllers) e da camada de acesso a dados (repositories).

### O que é um Use Case?

Um Use Case é uma classe responsável por:

- **Encapsular a lógica de negócio**: Toda a regra de negócio em um único lugar
- **Ser independente do framework**: Não depende de HTTP, banco de dados ou outras tecnologias específicas
- **Ser testável**: Fácil de testar sem mockar a camada HTTP ou banco de dados
- **Ser reutilizável**: Pode ser chamado de diferentes contextos (HTTP, CLI, fila de mensagens, etc.)

### Estrutura de um Use Case

```typescript
// src/use-cases/register-use-case.ts
import { User } from '@prisma/client'
import { UserRepository } from '@/repositories/user-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    // Validações de negócio
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    // Lógica de negócio
    const user = await this.userRepository.create({
      name,
      email,
      password: await hashPassword(password),
    })

    return { user }
  }
}
```

### Use Case no Controller

O controller chama o use case e apenas lida com a requisição HTTP:

```typescript
export class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body

    const { user } = await this.registerUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send(user)
  }
}
```

## 📦 Repository Pattern

O **Repository Pattern** é um padrão de design que fornece uma abstração para acesso a dados. Ele atua como uma camada intermediária entre a aplicação e a fonte de dados (banco de dados).

### O que é um Repository?

Um Repository é responsável por:

- **Abstrair o acesso aos dados**: Encapsula a lógica de consulta ao banco de dados
- **Fornecer uma interface consistente**: Define métodos claros para operações CRUD
- **Facilitar testes**: Permite mockar o repositório nos testes unitários
- **Desacoplar a aplicação**: Muda o banco de dados sem alterar o código de negócio

### Estrutura de um Repository

```typescript
// src/repositories/user-repository.ts
import { User, Prisma } from '@prisma/client'

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>
  delete(id: string): Promise<void>
}

// Implementação com Prisma
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
```

### Vantagens do Repository Pattern

✅ **Facilita testes**: Mocke o repositório em testes unitários  
✅ **Manutenção**: Mudanças no banco de dados ficam isoladas  
✅ **Escalabilidade**: Fácil migrar de um banco de dados para outro  
✅ **Reutilização**: O mesmo repositório serve múltiplos use cases  
✅ **Clean Code**: Separação clara de responsabilidades  

### Fluxo completo: Request → Controller → Use Case → Repository

```
HTTP Request
    ↓
Controller (recebe dados HTTP)
    ↓
Use Case (processa lógica de negócio)
    ↓
Repository (acessa/persiste dados)
    ↓
Banco de Dados
```

Essa arquitetura deixa o código mais limpo, testável e fácil de manter!

## 🧩 SOLID — D (Dependency Inversion)

O princípio **D** (Inversão de Dependência) diz que **módulos de alto nível não devem depender de módulos de baixo nível**, e sim de **abstrações**. Na prática, isso significa **injetar dependências** e permitir trocar implementações sem alterar a regra de negócio.

### Exemplo no projeto

- O `RegisterUseCase` recebe o repositório por **injeção no construtor**, não cria diretamente a dependência.
- O controller decide **qual implementação** será usada (Prisma ou In-Memory).

Trechos reais do código:

```ts
// src/http/controllers/register.ts
const usersRepository = new PrismaUsersRepository()
const registerUseCase = new RegisterUseCase(usersRepository)
```

```ts
// src/use-cases/register.ts
export class RegisterUseCase {
  constructor(private readonly prismaUsersRepository: PrismaUsersRepository) {}
}
```

Isso permite, por exemplo, substituir `PrismaUsersRepository` por `InMemoryUsersRepository` em testes sem alterar a lógica do caso de uso.
