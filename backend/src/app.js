
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
 
const app = express()
 
// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())
 
// Health check
app.get('/', (req, res) => res.json({ status: 'ok crac' }))
app.get('/health', (req, res) => res.json({ status: 'ok' }))
 
// Routes → se agregan acá a medida que se desarrollan
// app.use('/api/events', eventRoutes)
 
export default app
 