import { z } from 'zod'
 
// Request
export const createEventSchema = z.object({
  event_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  event_type: z.string().min(2, 'El tipo de evento es requerido'),
})
 
// Response DTO
export const toEventResponse = (event) => ({
  id: event.id_event,
  event_name: event.event_name,
  date: event.date,
  event_type: event.event_type,
  state: event.state,
})
 