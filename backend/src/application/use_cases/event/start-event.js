
export class StartEvent {
  constructor(eventRepository) {
    this.eventRepository = eventRepository
  }
 
  async execute({ id_event, id_organizer }) {
    // 1 - Verificar que el evento existe y pertenece al organizador
    const event = await this.eventRepository.findById(id_event)
    if (!event) throw new Error('Evento no encontrado')
    if (event.id_organizer !== id_organizer) throw new Error('No tenés permiso para modificar este evento')
 
    // 2 - Verificar que está en estado pendiente
    if (event.state !== 'pendiente') throw new Error('El evento ya fue iniciado o finalizado')
 
    // 3 - Cambiar estado a activo
    return await this.eventRepository.updateState(id_event, 'activo')
  }
}
 