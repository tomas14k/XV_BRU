import { Navigate } from 'react-router'
import { useAuth } from '@/app/providers/AuthContext'

export default function PublicGuard({ children }) {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Cargando...</span>
      </div>
    )
  }

  return children
}