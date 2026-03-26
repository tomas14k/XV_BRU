import { IdleImage } from "../../../domain/entities/idle-image.js"

export class CreateIdleImage {
  constructor(idleImageRepository) {
    this.idleImageRepository = idleImageRepository
  }

  async execute({ id_event, url, order }) {
    const idleImage = new IdleImage({ id_event, url, order })
    return await this.idleImageRepository.create(idleImage)
  }
}