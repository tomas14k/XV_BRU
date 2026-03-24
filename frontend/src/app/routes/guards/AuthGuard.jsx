import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/app/providers/AuthContext'

export default function AuthGuard({ children }) {
  const { isLoggedIn, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Cargando...</span>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return children
}