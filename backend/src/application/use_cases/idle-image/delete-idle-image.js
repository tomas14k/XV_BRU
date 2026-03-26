export class DeleteIdleImage {
  constructor(idleImageRepository) {
    this.idleImageRepository = idleImageRepository
  }

  async execute(id_idle_image) {
    if (!id_idle_image) throw new Error('id_idle_image es requerido')
    return await this.idleImageRepository.delete(id_idle_image)
  }
}