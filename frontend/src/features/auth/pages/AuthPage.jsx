import { useState } from 'react'
import Silk from '@/features/auth/components/Background.jsx'
import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'
import BlurText from '../components/BlurText'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Mitad izquierda — form */}
      <div className="flex flex-col p-6 md:p-10 bg-neutral-50">
        <div className="flex justify-start">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
            ✦ Brune
          </a>
        </div>
        <div className="flex flex-1 items-center flex-col justify-center">
          <BlurText
            key={isLogin ? 'login' : 'register'}
            text={isLogin ? 'Bienvenido.' : 'Creá tu cuenta.'}
            delay={500}
            animateBy="words"
            direction="top"
            className="text-4xl text-black font-extrabold"
          />
          <div className="w-full max-w-sm">
            {isLogin
              ? <LoginForm onToggle={() => setIsLogin(false)} />
              : <RegisterForm onToggle={() => setIsLogin(true)} />
            }
          </div>
        </div>
      </div>

      {/* Mitad derecha — Silk */}
      <div className="relative hidden lg:block">
        <Silk color="#62a0ea" speed={3} scale={1} noiseIntensity={1} />
      </div>
    </div>
  )
}