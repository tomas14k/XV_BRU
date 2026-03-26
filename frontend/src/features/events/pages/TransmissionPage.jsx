import { EventActionButton } from "../components/EventActionButton"
import { useParams } from 'react-router'
import { useEvent } from "../hooks/useEvent"
import { useTransmission } from "../hooks/useTransmission"
import BlurText from "@/features/auth/components/BlurText"
import { PHOTO_DURATION } from "../hooks/useTransmission"

export default function TransmissionPage() {
    const { id_event } = useParams()
    const { actionLoading, handleEnd, handleStart } = useEvent()
    const { currentPhoto, queue, isConnected } = useTransmission()

    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">

            {/* Foto actual */}
            {currentPhoto && (
                <div className="absolute inset-0">
                    <img
                        key={currentPhoto.id_photo}
                        src={currentPhoto.url}
                        alt={currentPhoto.autor_name ?? 'Foto'}
                        className="w-full h-full object-contain animate-fade-in"
                    />
                    {/* Barra de progreso */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                        <div
                            key={currentPhoto.id_photo}
                            className="h-full bg-sky-400/50 origin-left"
                            style={{
                                animation: `shrink ${PHOTO_DURATION}ms linear forwards`
                            }}
                        />
                    </div>

                    {/* Autor — esquina superior izquierda */}
                    {currentPhoto.autor_name && (
                        <BlurText
                            key={currentPhoto.id_photo}
                            text={currentPhoto.autor_name}
                            delay={200}
                            animateBy="letters"
                            direction="top"
                            className="absolute top-6 left-6 text-white text-2xl font-semibold drop-shadow-lg"
                        />
                    )}

                    {/* Mensaje — pie de foto */}
                    {currentPhoto.message && (
                        <p className="absolute bottom-6 left-6 right-6 text-white text-lg drop-shadow-lg">
                            {currentPhoto.message}
                        </p>
                    )}
                </div>
            )}

            {/* Botón finalizar — esquina superior derecha */}
            <div className="absolute top-4 right-4 z-10">
                <EventActionButton
                    state="activo"
                    loading={actionLoading}
                    onEnd={() => handleEnd(id_event)}
                />
            </div>

            {/* Solo para desarrollo */}
            {queue.length > 0 && (
                <p className="absolute bottom-4 right-4 text-white/50 text-sm z-10">
                    Fotos en cola: {queue.length}
                </p>
            )}
        </div>
    )

}