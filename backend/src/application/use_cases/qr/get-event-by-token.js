export class GetEventByToken {
  constructor(qrSetupRepository) {
    this.qrSetupRepository = qrSetupRepository
  }

  async execute(link_token) {
    const qr = await this.qrSetupRepository.findByToken(link_token)
    if (!qr) throw new Error('Evento no encontrado')
    return { id_event: qr.id_event }
  }
}