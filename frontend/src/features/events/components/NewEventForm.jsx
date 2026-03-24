import Stepper, { Step } from "../components/Stepper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createEventSchema } from "../schemas/event.schema"

// shadcn
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewEventForm({ onSubmitForm }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createEventSchema),
    })

    return (
        <form className="bg-indigo-400" onSubmit={handleSubmit(onSubmitForm)}>
            <Stepper
                initialStep={1}
                onStepChange={(step) => console.log(step)}
                onFinalStepCompleted={() => console.log("hola")}
                backButtonText="Atrás"
                nextButtonText="Siguiente"

            >
                {/* STEP 1 */}
                <Step>
                    <h2 className="text-xl font-semibold">Bienvenido</h2>
                    <p>¡A continuación configura tu evento!</p>
                </Step>

                {/* STEP 2 */}
                <Step>
                    <div className="space-y-2">
                        <Label>Nombre del evento</Label>
                        <Input
                            placeholder="Ej: XV de Martina"
                            {...register("event_name")}
                        />
                        {errors.event_name && (
                            <p className="text-red-500 text-sm">
                                {errors.event_name.message}
                            </p>
                        )}
                    </div>
                </Step>

                {/* STEP 3 */}
                <Step>
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input
                            type="date"
                            {...register("date")}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm">
                                {errors.date.message}
                            </p>
                        )}
                    </div>
                </Step>

                {/* STEP 4 */}
                <Step>
                    <div className="space-y-2">
                        <Label>Tipo de evento</Label>
                        <Input
                            placeholder="Ej: XV, boda, cumpleaños"
                            {...register("event_type")}
                        />
                        {errors.event_type && (
                            <p className="text-red-500 text-sm">
                                {errors.event_type.message}
                            </p>
                        )}
                    </div>
                </Step>

                {/* STEP 5 */}
                <Step>
                    <h2 className="text-xl font-semibold">Final</h2>
                    <p>Todo listo para crear tu evento</p>
                </Step>
            </Stepper>
        </form>
    )
}