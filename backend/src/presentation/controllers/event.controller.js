import { CreateEvent } from '../../application/use_cases/event/create-event.js'
import { EndEvent } from '../../application/use_cases/event/end-event.js'
import { GetEventByOrganizer } from '../../application/use_cases/event/get-event.js'
import { StartEvent } from '../../application/use_cases/event/start-event.js'
import { PrismaEventRepository } from '../../infrastructure/database/repositories/event.repository.js'
import { PrismaQrSetupRepository } from '../../infrastructure/database/repositories/qr-setup.repository.js'
import { toEventResponse } from '../schemas/event.schema.js'
import { GetQrByEvent } from '../../application/use_cases/qr/get-qr.js'

const eventRepository = new PrismaEventRepository()

const qrSetupRepository = new PrismaQrSetupRepository()
const createEvent = new CreateEvent(eventRepository, qrSetupRepository)
const startEvent = new StartEvent(eventRepository)
const endEvent = new EndEvent(eventRepository)
const getEventByOrganizer = new GetEventByOrganizer(eventRepository)
const getQrByEvent = new GetQrByEvent(qrSetupRepository)

//crear evento
export const create = async (req, res) => {
  try {
    const { event_name, date, event_type } = req.body
    const id_organizer = req.organizer.id
    const { event, link_token } = await createEvent.execute({ id_organizer, event_name, date, event_type })
    return res.status(201).json({ ...toEventResponse(event), link_token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//obtener evento por organizador
export const getByOrganizer = async (req, res) => {
  try {
    const id_organizer = req.organizer.id
    const events = await getEventByOrganizer.execute({ id_organizer })
    return res.status(200).json(events.map(toEventResponse))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//Obtener el qe relacionado al evento
export const getQr = async (req, res) => {
  try {
    const { id_event } = req.params
    const id_organizer = req.organizer.id
    const qr = await getQrByEvent.execute({ id_event, id_organizer })
    return res.status(200).json({ link_token: qr.link_token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//iniciar transmision de evento
export const start = async (req, res) => {
  try {
    const { id_event } = req.params
    const id_organizer = req.organizer.id
    const event = await startEvent.execute({ id_event, id_organizer })
    return res.status(200).json(toEventResponse(event))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//finalizar transmision de evento
export const end = async (req, res) => {
  try {
    const { id_event } = req.params
    const id_organizer = req.organizer.id
    const event = await endEvent.execute({ id_event, id_organizer })
    return res.status(200).json(toEventResponse(event))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
