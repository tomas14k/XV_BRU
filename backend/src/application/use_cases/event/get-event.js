
export class GetEventByOrganizer {
  constructor(eventRepository) {
    this.eventRepository = eventRepository
  }
 
  async execute({ id_organizer }) {
    const events = await this.eventRepository.findByOrganizer(id_organizer)
    return events
  }
}