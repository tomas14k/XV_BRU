import { Router } from 'express'
import { create } from '../controllers/event.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createEventSchema } from '../schemas/event.schema.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

 
const router = Router()

router.post('/create', authMiddleware, validate(createEventSchema), create)

export default router