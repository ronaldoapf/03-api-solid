import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export const errorHandler: FastifyInstance['errorHandler'] = (
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
