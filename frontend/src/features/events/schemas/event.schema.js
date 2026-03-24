import { z } from 'zod'
 
export const createEventSchema = z.object({
  event_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Fecha inválida'),
  event_type: z.string().min(2, 'El tipo de evento es requerido'),
})


 