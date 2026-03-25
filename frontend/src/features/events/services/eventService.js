import { privateClient } from '@/lib/api/clients'
import { ENDPOINTS } from '@/lib/api/endpoints'

export const eventService = {
  async create({ event_name, date, event_type }) {
    const { data } = await privateClient.post(ENDPOINTS.EVENTS.create, { event_name, date, event_type })
    return data
  },
  async get({ }) {
    const { data } = await privateClient.get(ENDPOINTS.EVENTS.getByOrganizer)
    return data
  },
  async start({ id_event }) {
    const { data } = await privateClient.patch(ENDPOINTS.EVENTS.start(id_event))
    return data
  },
  async end({ id_event }) {
    const { data } = await privateClient.patch(ENDPOINTS.EVENTS.end(id_event))
    return data
  },
  async getQr({ id_event }) {
    const { data } = await privateClient.get(ENDPOINTS.EVENTS.getQr(id_event))
    return data
  },
}

/* create devuelve
  id: event.id_event,
  event_name: event.event_name,
  date: event.date,
  event_type: event.event_type,
  state: event.state, */