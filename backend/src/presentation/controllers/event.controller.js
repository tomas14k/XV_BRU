import { CreateEvent } from '../../application/use_cases/event/create-event.js'
import { PrismaEventRepository } from '../../infrastructure/database/repositories/event.repository.js'
import { toEventResponse } from '../schemas/event.schema.js'

const eventRepository = new PrismaEventRepository()
const createEvent = new CreateEvent(eventRepository)

export const create = async (req, res) => {
  try {
    const { event_name, date, event_type } = req.body
    
    const id_organizer = req.organizer.id // viene del JWT via authMiddleware

    const event = await createEvent.execute({ id_organizer, event_name, date, event_type })
    return res.status(201).json(toEventResponse(event))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}