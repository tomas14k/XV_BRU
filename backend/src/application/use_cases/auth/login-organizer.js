export class LoginOrganizer {
  constructor(organizerRepository, passwordHasher, jwtHandler) {
    this.organizerRepository = organizerRepository
    this.passwordHasher = passwordHasher
    this.jwtHandler = jwtHandler
  }

  async execute({ email, password }) {
    // 1 - Buscar el organizador
    const organizer = await this.organizerRepository.findByEmail(email)
    if (!organizer) throw new Error('Credenciales inválidas')

    // 2 - Verificar el password
    const valid = await this.passwordHasher.verify(password, organizer.password_hash)
    if (!valid) throw new Error('Credenciales inválidas')

    // 3 - Generar JWT
    const token = this.jwtHandler.sign({
      id: organizer.id_organizer,
      email: organizer.email,
    })

    return { organizer, token }
  }
}