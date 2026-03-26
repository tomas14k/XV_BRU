export class IdleImage {
  constructor({ id_idle_image, id_event, url, order }) {
    this.id_idle_image = id_idle_image
    this.id_event = id_event
    this.url = url
    this.order = order ?? null
    this.#validate()
  }

  #validate() {
    if (!this.url) throw new Error('La URL es requerida')
    if (this.order !== null && this.order < 0) throw new Error('El orden no puede ser negativo')
  }
}