export class GetIdleImagesByEvent {
  constructor(idleImageRepository) {
    this.idleImageRepository = idleImageRepository
  }

  async execute(id_event) {
    if (!id_event) throw new Error('id_event es requerido')
    return await this.idleImageRepository.findByEvent(id_event)
  }
}