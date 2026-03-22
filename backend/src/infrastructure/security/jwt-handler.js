import jwt from 'jsonwebtoken'
 
export class JwtHandler {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }
 
  verify(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch {
      throw new Error('Token inválido')
    }
  }
}
 