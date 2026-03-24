import { Router } from 'express'
import { create, start, end } from '../controllers/event.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { createEventSchema } from '../schemas/event.schema.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()
router.use(authMiddleware)

router.post('/create', validate(createEventSchema), create)

router.patch('/:id_event/start', start)

router.patch('/:id_event/end', end)

export default router