const VALID_STATES = ['pendiente', 'activo', 'finalizado']

export class Event {
  constructor({ id_event, id_organizer, event_name, date, event_type, state }) {
    this.id_event = id_event
    this.id_organizer = id_organizer
    this.event_name = event_name
    this.date = new Date(date)
    this.event_type = event_type
    this.state = state ?? 'pendiente'

    this.#validate()
  }

  #validate() {
    if (this.date < new Date()) {
      throw new Error('La fecha del evento no puede ser en el pasado')
    }

    if (!VALID_STATES.includes(this.state)) {
      throw new Error(`El estado debe ser uno de: ${VALID_STATES.join(', ')}`)
    }
  }
}