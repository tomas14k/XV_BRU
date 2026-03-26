import { CreateIdleImage } from '../../application/use_cases/idle-image/create-idle-image.js'
import { GetIdleImagesByEvent } from '../../application/use_cases/idle-image/get-idle-images.js'
import { DeleteIdleImage } from '../../application/use_cases/idle-image/delete-idle-image.js'
import { PrismaIdleImageRepository } from '../../infrastructure/database/repositories/idle-image.repository.js'


const idleImageRepository = new PrismaIdleImageRepository()
const createIdleImage = new CreateIdleImage(idleImageRepository)
const getIdleImagesByEvent = new GetIdleImagesByEvent(idleImageRepository)
const deleteIdleImage = new DeleteIdleImage(idleImageRepository)

export const create = async (req, res) => {
  try {
    const { id_event, url, order } = req.body
    const image = await createIdleImage.execute({ id_event, url, order })
    return res.status(201).json(image)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const getByEvent = async (req, res) => {
  try {
    const { id_event } = req.params
    const images = await getIdleImagesByEvent.execute(id_event)
    return res.status(200).json(images)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const remove = async (req, res) => {
  try {
    const { id_idle_image } = req.params
    await deleteIdleImage.execute(id_idle_image)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}