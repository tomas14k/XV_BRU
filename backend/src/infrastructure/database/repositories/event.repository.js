import { EventRepository } from '../../../domain/repositories/event.repository.js'
import { Event } from '../../../domain/entities/event.js'
import { prisma } from '../prisma.js'

export class PrismaEventRepository extends EventRepository {
  async create({ id_organizer, event_name, date, event_type }) {
    const event = await prisma.event.create({
      data: { id_organizer, event_name, date, event_type },
    })
    return new Event(event)
  }

  async findById(id_event) {
    const event = await prisma.event.findUnique({
      where: { id_event },
    })
    if (!event) return null
    return new Event(event)
  }

  async findByOrganizer(id_organizer) {
    const events = await prisma.event.findMany({
      where: { id_organizer },
      orderBy: { date: 'asc' },
    })
    return events.map((e) => new Event(e))
  }

  async updateState(id_event, state) {
    const event = await prisma.event.update({
      where: { id_event },
      data: { state },
    })
    return new Event(event)
  }
}