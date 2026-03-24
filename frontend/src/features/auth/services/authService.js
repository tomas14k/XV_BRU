import { publicClient } from '@/lib/api/clients'
import { ENDPOINTS } from '@/lib/api/endpoints'

export const authService = {
  async login({ email, password }) {
    const { data } = await publicClient.post(ENDPOINTS.AUTH.login, { email, password })
    return data
  },

  async register({ name, email, password }) {
    const { data } = await publicClient.post(ENDPOINTS.AUTH.register, { name, email, password })
    return data
  },
}