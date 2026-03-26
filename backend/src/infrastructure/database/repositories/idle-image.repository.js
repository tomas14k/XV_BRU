import { prisma } from '../prisma.js'
import { IdleImageRepository } from '../../../domain/repositories/idle-image.repository.js'

export class PrismaIdleImageRepository extends IdleImageRepository {
  async create(idleImage) {
    return await prisma.idleImage.create({
      data: {
        id_event: idleImage.id_event,
        url: idleImage.url,
        order: idleImage.order,
      }
    })
  }

  async findByEvent(id_event) {
    return await prisma.idleImage.findMany({
      where: { id_event },
      orderBy: { order: 'asc' },
    })
  }

  async delete(id_idle_image) {
    return await prisma.idleImage.delete({
      where: { id_idle_image },
    })
  }
}