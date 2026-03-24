import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

// Cliente público — sin token (register, login)
export const publicClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Cliente privado — agrega el token automáticamente
export const privateClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

privateClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

privateClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Manejo de error cuando el token está expirado
      localStorage.removeItem("access_token");
      window.location.href = "/auth/login"; // -> Redireccionar al usuario al login
    }
    return Promise.reject(error);
  }
);
