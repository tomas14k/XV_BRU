import { Photo } from '../../../domain/entities/photo.js'

export class CreatePhoto {
  constructor(photoRepository) {
    this.photoRepository = photoRepository
  }

  async execute({ id_event, url, message, autor_name }) {
    // 1 - Crear la entidad (valida reglas de negocio)
    const photo = new Photo({ id_event, url, message, autor_name })

    // 2 - Persistir
    const created = await this.photoRepository.create(photo)

    return created
  }
}