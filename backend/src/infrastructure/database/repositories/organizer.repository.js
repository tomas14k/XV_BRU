import { OrganizerRepository } from '../../../domain/repositories/organizer.repository.js'
import { Organizer } from '../../../domain/entities/organizer.js'
import { prisma } from '../prisma.js'
 
export class PrismaOrganizerRepository extends OrganizerRepository {
  async findByEmail(email) {
    const organizer = await prisma.organizer.findUnique({
      where: { email },
    })
    if (!organizer) return null
    return new Organizer(organizer)
  }
 
  async create({ name, email, password_hash }) {
    const organizer = await prisma.organizer.create({
      data: { name, email, password_hash },
      select: { id_organizer: true, name: true, email: true } // sin password_hash
    })
    return new Organizer(organizer)
  }
}
 