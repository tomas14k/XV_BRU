import { Event } from '../../../domain/entities/event.js'

export class CreateEvent {
  constructor(eventRepository) {
    this.eventRepository = eventRepository
  }

  async execute({ id_organizer, event_name, date, event_type }) {
    // 1 - Validar mediante la entidad (fecha pasada, state válido)
    new Event({ id_organizer, event_name, date, event_type, state: 'pendiente' })

    // 2 - Crear el evento
    const event = await this.eventRepository.create({
      id_organizer,
      event_name,
      date: new Date(date),
      event_type,
    })

    return event
  }
}