import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './src/app.js'
import { initSocket } from './src/infrastructure/socket/socket.service.js'


const PORT = process.env.PORT || 3000

const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})

initSocket(io)

io.on('connection', (socket) => {
  console.log('cliente conectado:', socket.id)

  socket.on('disconnect', () => {
    console.log('cliente desconectado:', socket.id)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})