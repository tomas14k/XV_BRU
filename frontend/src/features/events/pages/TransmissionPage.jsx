import { EventActionButton } from "../components/EventActionButton"
import { useParams } from 'react-router'
import { useEvent } from "../hooks/useEvent"


export default function TransmissionPage() {
    const { id_event } = useParams()
    const { actionLoading, handleEnd, handleStart } = useEvent()

    return (
        <>
            {/* Botón acción */}
            <EventActionButton
                state="activo"
                loading={actionLoading}
                onStart={handleStart}
                onEnd={() => handleEnd(id_event)}
            />
        </>
    )

}