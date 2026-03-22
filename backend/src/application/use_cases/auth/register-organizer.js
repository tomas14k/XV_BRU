export class RegisterOrganizer {
  constructor(organizerRepository, passwordHasher, jwtHandler) {
    this.organizerRepository = organizerRepository
    this.passwordHasher = passwordHasher
    this.jwtHandler = jwtHandler
  }

  async execute({ name, email, password }) {
    // 1 - Verificar si el email ya existe
    const existing = await this.organizerRepository.findByEmail(email)
    if (existing) throw new Error('El email ya está registrado')

    // 2 - Hashear el password
    const password_hash = await this.passwordHasher.hash(password)

    // 3 - Crear el organizador
    const organizer = await this.organizerRepository.create({
      name,
      email,
      password_hash,
    })

    // 4 - Generar JWT y devolver login inmediato
    const token = this.jwtHandler.sign({
      id: organizer.id_organizer,
      email: organizer.email,
    })

    return { organizer, token }
  }
}