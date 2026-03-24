import { JwtHandler } from '../../infrastructure/security/jwt-handler.js'

const jwtHandler = new JwtHandler()

export const authMiddleware = (req, res, next) => {
  try {
    // 1 - Obtener el token del header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }

    // 2 - Extraer y verificar el token
    const token = authHeader.split(' ')[1]
    const payload = jwtHandler.verify(token)

    // 3 - Adjuntar el payload al request para usarlo en las rutas
    req.organizer = payload
    

    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}