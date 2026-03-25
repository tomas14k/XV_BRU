export class GetQrByEvent{
    constructor(QrSetupRepository){
        this.QrSetupRepository = QrSetupRepository
    }

    async execute(id_event) {
        const qr = await QrSetupRepository.findByEvent(id_event)
        
        if (!qr) throw new Error("QR no encontrado");
         
        return qr
       
    }
}