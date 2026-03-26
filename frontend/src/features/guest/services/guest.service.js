import { publicClient } from '@/lib/api/clients'
import { ENDPOINTS } from '@/lib/api/endpoints'

export const photoService = {
  async create({ link_token, autor_name , message, url  }) {
    const { data } = await publicClient.post(ENDPOINTS.PHOTOS.create, { link_token, autor_name , message, url})
    return data
  },
}
