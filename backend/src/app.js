
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './presentation/routes/auth.routes.js'
import eventRoutes from './presentation/routes/event.routes.js'

const app = express()
 
// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())
 
// Health check
app.get('/', (req, res) => res.json({ status: 'ok crac' }))
app.get('/health', (req, res) => res.json({ status: 'ok' }))
 
// Routes → 
// app.use('/api/events', eventRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes) 

export default app
 