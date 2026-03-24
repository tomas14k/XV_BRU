import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../../features/auth/services/authService.js'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [organizer, setOrganizer] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Persistir sesión al recargar
  useEffect(() => {
    const savedOrganizer = localStorage.getItem('organizer')
    const savedToken = localStorage.getItem('token')
    if (savedOrganizer && savedToken) {
      setOrganizer(JSON.parse(savedOrganizer))
      setToken(savedToken)
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }, [])

  const login = async ({ email, password }) => {
    try {
      setError(null)
      const data = await authService.login({ email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('organizer', JSON.stringify(data.organizer))
      setToken(data.token)
      setOrganizer(data.organizer)
      setIsLoggedIn(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  const register = async ({ name, email, password }) => {
    try {
      setError(null)
      const data = await authService.register({ name, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('organizer', JSON.stringify(data.organizer))
      setToken(data.token)
      setOrganizer(data.organizer)
      setIsLoggedIn(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('organizer')
    setToken(null)
    setOrganizer(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ organizer, token, isLoggedIn, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}