import { CreatePhoto } from '../../application/use_cases/photo/create-photo.js'
import { GetEventByToken } from '../../application/use_cases/qr/get-event-by-token.js'
import { PrismaPhotoRepository } from '../../infrastructure/database/repositories/photo.repository.js'
import { PrismaQrSetupRepository } from '../../infrastructure/database/repositories/qr-setup.repository.js'

const photoRepository = new PrismaPhotoRepository()
const qrSetupRepository = new PrismaQrSetupRepository()
const createPhoto = new CreatePhoto(photoRepository)
const getEventByToken = new GetEventByToken(qrSetupRepository)

export const create = async (req, res) => {
  try {
    const { link_token, url, message, autor_name } = req.body
    const { id_event } = await getEventByToken.execute(link_token)
    const photo = await createPhoto.execute({ id_event, url, message, autor_name })
    return res.status(201).json(photo)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}