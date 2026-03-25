import { GuestLandingPage } from '@/features/guest/pages/GuestLandingPage'
import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from 'react'
import AppLayout from '@/shared/layout/AppLayout';

import AuthGuard from './guards/AuthGuard.jsx'
import PublicGuard from './guards/PublicGuard.jsx'

// Estas SÍ se cargan siempre - son livianas
//const InvitadoPage = lazy(() => import('@/features/guest/pages/InvitadoPage'))
//import LoginPage from '@/features/organizer/pages/LoginPage'


// Estas NO - solo si navegás a esa ruta
//const DashboardPage = lazy(() => import('@/features/organizer/pages/DashboardPage'))
//const TransmisionPage = lazy(() => import('@/features/organizer/pages/TransmisionPage'))


const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage.jsx'))
const NewEventPage = lazy(() => import('@/features/events/pages/NewEventPage.jsx'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage.jsx'))
const TransmissionPage = lazy(() => import('@/features/events/pages/TransmissionPage.jsx'))


const withSuspense = (Component) => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  // Rutas privadas — bajo AppLayout protegido
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>),
    children: [
      { path: "/", element: <div>koko</div> },
      { path: "/dashboard", element: withSuspense(DashboardPage), },
      { path: '/organizador', element: withSuspense(DashboardPage), },
    ],
  },
  {
    path: "/event/new",
    element: (
      <AuthGuard>
        <NewEventPage />
      </AuthGuard>
    ),
  },
  {
    path: '/organizador/transmision/:id_event',
    element: 
    <AuthGuard>
      <TransmissionPage />
    </AuthGuard>
  },
  // Rutas públicas
  {
    path: "/auth/login",
    element: (
      <PublicGuard>
        <AuthPage />
      </PublicGuard>
    ),
  },

  { path: '/e/:token', element: <div>Invitado</div>, },

  // Redirect raíz
  { path: '/', element: <Navigate to="/auth/login" replace /> },
])


/* asi se usa {
  path: '/organizador',
  element: (
    <Suspense fallback={<div>Cargando...</div>}>
      <DashboardPage />
    </Suspense>
  ),
}

El fallback lo podés centralizar en un componente PageLoader 
en shared/components para no repetirlo en cada ruta.

Suspense + fallback maneja el momento en que el archivo JS de la página todavía no fue descargado. Es decir, 
la primera vez que alguien entra a esa ruta y el chunk aún no está en el browser. Una vez que se descargó, no vuelve a mostrarse.
Usuario entra a /organizador
  → el JS de DashboardPage no está descargado todavía
  → Suspense muestra el fallback (spinner, skeleton, etc.)
  → se descarga el chunk
  → renderiza la página
 */


/* como quedaria el enrutamiento con las pages implementadas

import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PageLoader from '@/shared/components/PageLoader'

const DashboardPage = lazy(() => import('@/features/organizer/pages/DashboardPage'))
const InvitadoPage = lazy(() => import('@/features/guest/pages/InvitadoPage'))

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/organizador',
    element: withSuspense(DashboardPage),
  },
  {
    path: '/e/:token',
    element: withSuspense(InvitadoPage),
  },
])*/