import { RouterProvider } from "react-router/dom";
import { router } from '../routes'
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './AuthContext'
import { Toaster } from "@/components/ui/sonner"

export function Providers() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TooltipProvider>
    </AuthProvider>
  )
}