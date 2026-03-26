export class Photo {
  constructor({ id_photo, id_event, url, message, autor_name, created_at }) {
    this.id_photo = id_photo
    this.id_event = id_event
    this.url = url
    this.message = message ?? null
    this.autor_name = autor_name ?? null
    this.created_at = created_at ?? new Date()
    this.#validate()
  }

  #validate() {
    if (this.message && this.message.length > 250) {
      throw new Error('El mensaje no puede superar los 250 caracteres')
    }
    if (this.autor_name && this.autor_name.length > 30) {
      throw new Error('El nombre no puede superar los 30 caracteres')
    }
  }
}