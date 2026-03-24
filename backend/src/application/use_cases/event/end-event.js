export class EndEvent {
  constructor(eventRepository) {
    this.eventRepository = eventRepository
  }
 
  async execute({ id_event, id_organizer }) {
    // 1 - Verificar que el evento existe y pertenece al organizador
    const event = await this.eventRepository.findById(id_event)
    if (!event) throw new Error('Evento no encontrado')
    if (event.id_organizer !== id_organizer) throw new Error('No tenés permiso para modificar este evento')
 
    // 2 - Verificar que está en estado activo
    if (event.state !== 'activo') throw new Error('El evento no está activo')
 
    // 3 - Cambiar estado a finalizado
    return await this.eventRepository.updateState(id_event, 'finalizado')
  }
}
 