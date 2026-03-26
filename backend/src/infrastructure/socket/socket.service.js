//singleton de socket
let _io = null

export const initSocket = (io) => {
  _io = io
}

export const getIO = () => {
  if (!_io) throw new Error('Socket.io no inicializado')
  return _io
}

