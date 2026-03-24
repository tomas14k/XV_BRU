import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { registerSchema } from '../schema/login.schema.js'
import { useAuth } from '@/app/providers/AuthContext.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Label } from '@/components/ui/label.jsx'

export function RegisterForm({ onToggle }) {
    const { register: registerUser, isLoggedIn, loading, error } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    })

    useEffect(() => {
        if (isLoggedIn) navigate('/event/new')
    }, [isLoggedIn])

    const onSubmit = (data) => {
        registerUser(data)
    }

    return (
        <div className="flex flex-col gap-6 text-neutral-700">
            <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground mt-2 ">
                    Completá tus datos para empezar
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="-mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" {...register('name')} />
                    {errors.name && (
                        <span className="text-xs text-destructive">{errors.name.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" {...register('email')} />
                    {errors.email && (
                        <span className="text-xs text-destructive">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
                    {errors.password && (
                        <span className="text-xs text-destructive">{errors.password.message}</span>
                    )}
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" disabled={loading} className="mt-2 w-full bg-neutral-800 text-white cursor-pointer hover:bg-neutral-900">
                    {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    ¿Ya tenés cuenta?{' '}
                    <Button onClick={onToggle} className="cursor-pointer text-gray-500 underline-offset-4 underline hover:underline hover:text-gray-900 bg-transparent p-0">
                        inicia sesion
                    </Button>
                </p>
            </form>
        </div>
    )
}