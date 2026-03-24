import { RouterProvider } from "react-router/dom";
import { router } from '../routes'
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './AuthContext'

export function Providers() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </AuthProvider>
  )
}