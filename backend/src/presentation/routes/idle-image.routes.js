import { Router } from 'express'
import { create, getByEvent, remove } from '../controllers/idle-image.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.use(authMiddleware)

router.post('/', create)
router.get('/:id_event', getByEvent)
router.delete('/:id_idle_image', remove)

export default router