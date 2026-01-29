import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', async () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const userPassword = '123456'
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@acme.com',
      password: userPassword,
    })

    const isPasswordCorrectlyHashed = await compare(
      userPassword,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same e-mail twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const userPassword = '123456'

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@acme.com',
      password: userPassword,
    })

    await expect(
      async () =>
        await registerUseCase.execute({
          name: 'John Doe',
          email: 'johndoe@acme.com',
          password: userPassword,
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const userPassword = '123456'

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@acme.com',
      password: userPassword,
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
