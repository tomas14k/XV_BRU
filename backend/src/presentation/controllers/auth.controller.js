import { RegisterOrganizer } from '../../application/use_cases/auth/register-organizer.js'
import { LoginOrganizer } from '../../application/use_cases/auth/login-organizer.js'
import { PrismaOrganizerRepository } from '../../infrastructure/database/repositories/organizer.repository.js'
import { PasswordHasher } from '../../infrastructure/security/password-hasher.js'
import { JwtHandler } from '../../infrastructure/security/jwt-handler.js'
import { toAuthResponse } from '../schemas/auth.schema.js'

// Construir dependencias
const organizerRepository = new PrismaOrganizerRepository()
const passwordHasher = new PasswordHasher()
const jwtHandler = new JwtHandler()

// Construir use cases
const registerOrganizer = new RegisterOrganizer(organizerRepository, passwordHasher, jwtHandler)
const loginOrganizer = new LoginOrganizer(organizerRepository, passwordHasher, jwtHandler)

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const { organizer, token } = await registerOrganizer.execute({ name, email, password })
    return res.status(201).json(toAuthResponse(organizer, token))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { organizer, token } = await loginOrganizer.execute({ email, password })
    return res.status(200).json(toAuthResponse(organizer, token))
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}