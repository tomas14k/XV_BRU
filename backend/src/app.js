
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './presentation/routes/auth.routes.js'

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
 
export default app
 