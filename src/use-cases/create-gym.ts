import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface CreateGymUseCaseRequest {
  title: string
  latitude: number
  longitude: number
  phone?: string | null
  description?: string | null
}
interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    phone,
    latitude,
    longitude,
    description,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      phone,
      latitude,
      longitude,
      description,
    })

    return { gym }
  }
}
