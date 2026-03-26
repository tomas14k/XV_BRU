import { prisma } from '../prisma.js'
import { PhotoRepository } from '../../../domain/repositories/photo.repository.js'

export class PrismaPhotoRepository extends PhotoRepository {
  async create(photo) {
    return await prisma.photo.create({
      data: {
        id_event: photo.id_event,
        url: photo.url,
        message: photo.message,
        autor_name: photo.autor_name,
      }
    })
  }

  async findByEvent(id_event) {
    return await prisma.photo.findMany({
      where: { id_event },
      orderBy: { created_at: 'asc' }
    })
  }
}