import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    phone: z.string().nullable(),
    description: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()
  await createGymUseCase.execute({
    phone,
    title,
    latitude,
    longitude,
    description,
  })

  return reply.status(201).send()
}
