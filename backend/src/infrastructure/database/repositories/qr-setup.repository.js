import { QrSetupRepository } from '../../../domain/repositories/qr-setup.repository.js'
import { QrSetup } from '../../../domain/entities/qr-setup.js'
import { prisma } from '../prisma.js'

export class PrismaQrSetupRepository extends QrSetupRepository {
  async create({ id_event, link_token }) {
    const qr = await prisma.qrSetup.create({
      data: { id_event, link_token },
    })
    return new QrSetup(qr)
  }

  async findByEvent(id_event) {
    const qr = await prisma.qrSetup.findUnique({
      where: { id_event },
    })
    if (!qr) return null
    return new QrSetup(qr)
  }
}