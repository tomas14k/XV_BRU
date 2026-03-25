import { randomUUID } from 'crypto'
import { Event } from '../../../domain/entities/event.js'

export class CreateEvent {
  constructor(eventRepository, qrSetupRepository) {
    this.eventRepository = eventRepository
    this.qrSetupRepository = qrSetupRepository
  }
  async execute({ id_organizer, event_name, date, event_type }) {
    new Event({ id_organizer, event_name, date, event_type, state: 'pendiente' })

    const event = await this.eventRepository.create({
      id_organizer, event_name, date: new Date(date), event_type,
    })

    console.log('evento creado:', event) // ← agregá esto

    const link_token = randomUUID()
    try {
      const qr = await this.qrSetupRepository.create({
        id_event: event.id_event,
        link_token,
      })
      console.log('qr creado:', qr)
      return { event, link_token: qr.link_token }
    } catch (error) {
      console.log('error al crear qr:', error.message)
      throw error
    }
    return { event, link_token: qr.link_token }
  }
}