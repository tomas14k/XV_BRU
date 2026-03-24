import { NewEventForm } from "../components/NewEventForm.jsx"
import { useCreateEvent } from "../hooks/useCreateEvent.js"
import { toast } from "sonner"
import { useNavigate } from 'react-router'

export default function NewEventPage() {

    const { createEvent, loading, error } = useCreateEvent()
    const navigate = useNavigate()

    const handleForm = async (data) => {
        try {
            await createEvent(data)
            toast.success('Evento creado con éxito 🎉',
                {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    position: "top-center"
                })
            navigate('/organizador')
        } catch {
            toast.error(`Error al crear el evento: ${error}` )
        }
    }
    return (
        <div>
            <NewEventForm onSubmitForm={handleForm} />
        </div>
    )
}