# App (Gympass style app)

Nesse projeto, vamos realizar o desenvolvimento de uma aplicação como o que conhecemos atualmente como Gympass. Nesse projeto, vamos trabalhar com padrões de projetos, testes automatizados e princípios da programação como SOLID, realizando desde o primeiro momento testes unitários e finalizandos com teste end-to-end.

## RF (Requisitos funcionais)
(Requisitos funcionais são requisitos que de certa forma determinam as funcionalidades da aplicação)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RN (Regras de negócio)
(Regras de negócio de certa forma são as condições as quais um determinado requisito funcional deverá funcionar)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos apís criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrar por administradores;

## RNFs (Requisitos não funcionais)
(Requisitos não funcionais são requisitos que não parte do cliente)

- [x] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON WEB TOKEN );



