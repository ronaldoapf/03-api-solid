import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { UsersRepository } from '@/repositories/users-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: UsersRepository
let sut: RegisterUseCase

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new RegisterUseCase(usersRepository)
})

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      email,
      name: 'John Doe',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
