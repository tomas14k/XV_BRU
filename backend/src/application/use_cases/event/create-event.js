import { randomUUID } from 'crypto'
import { Event } from '../../../domain/entities/event.js'

export class CreateEvent {
  constructor(eventRepository, qrSetupRepository) {
    this.eventRepository = eventRepository
    this.qrSetupRepository = qrSetupRepository
  }

  async execute({ id_organizer, event_name, date, event_type }) {
    // 1 - Validar mediante la entidad
    new Event({ id_organizer, event_name, date, event_type, state: 'pendiente' })

    // 2 - Crear el evento
    const event = await this.eventRepository.create({
      id_organizer,
      event_name,
      date: new Date(date),
      event_type,
    })

    // 3 - Generar token y crear qr_setup
    const link_token = randomUUID()
    const qr = await this.qrSetupRepository.create({
      id_event: event.id_event,
      link_token,
    })

    return { event, link_token: qr.link_token }
  }
}