import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { loginSchema } from '../schema/login.schema'

//shadcn
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

//hooks
import { useAuth } from '@/app/providers/AuthContext.jsx'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function LoginForm({onToggle}) {
    const { login, isLoggedIn, loading, error } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data) => login(data)

    useEffect(() => {
        if (isLoggedIn) navigate('/organizador')
    }, [isLoggedIn])

    return (
        <div className="flex flex-col gap-6 text-black">
            {/* Header */}
            <div className="flex flex-col gap-1">

                <p className="text-sm text-muted-foreground mt-2">
                    Comienza a darle magia a tu evento.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className="text-xs text-destructive">{errors.email.message}</span>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className="text-xs text-destructive">{errors.password.message}</span>
                    )}
                </div>

                {/* Error del servidor */}
                {error && <p className="text-sm text-destructive">{error}</p>}

                {/* Submit */}
                <Button type="submit" disabled={loading} className="w-full text-white bg-neutral-800 cursor-pointer hover:bg-neutral-900">
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </Button>

                {/* Link a register */}
                <p className="text-center text-sm text-muted-foreground">
                    ¿No tenés cuenta?{' '}
                    <Button onClick={onToggle} className="cursor-pointer text-gray-500 underline-offset-4 underline hover:underline hover:text-gray-900 bg-transparent p-0">
                        Registrate
                    </Button>
                </p>
            </form>
        </div>
    )
}