export class GetQrByEvent {
    constructor(QrSetupRepository) {
        this.QrSetupRepository = QrSetupRepository
    }

    async execute({ id_event, id_organizer }) {
        console.log('buscando qr para id_event:', id_event)
        const qr = await this.QrSetupRepository.findByEvent(id_event)
        console.log('qr encontrado:', qr)
        if (!qr) throw new Error('QR no encontrado')
        return qr
    }
}