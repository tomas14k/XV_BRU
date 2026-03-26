import { Router } from 'express'
import { create } from '../controllers/photo.controller.js'

const router = Router()

router.post('/upload', create)

export default router