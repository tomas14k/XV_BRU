import bcrypt from 'bcrypt'
 
export class PasswordHasher {
  async hash(plainPassword) {
    return bcrypt.hash(plainPassword, 10)
  }
 
  async verify(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}
 