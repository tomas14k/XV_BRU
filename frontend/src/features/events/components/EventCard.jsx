import { CalendarDays, Tag } from 'lucide-react'
import { STATE_CONFIG } from '../utils/state-event'
import { LoadingCard } from './LoadingCard'
import { EventActionButton } from './EventActionButton'

import { useEvent } from "../hooks/useEvent"

export function EventCard() {
    
    const { event, loading, actionLoading, handleStart, handleEnd } = useEvent()

    if (loading) { return <LoadingCard /> }

    if (!event) return null

    const stateConfig = STATE_CONFIG[event.state]

    const formattedDate = new Date(event.date).toLocaleDateString('es-AR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    return (
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-display text-2xl font-bold text-white">{event.event_name}</h2>
                    <p className="text-sm text-white/40 mt-0.5 capitalize">{event.event_type}</p>
                </div>

                {/* Estado badge */}
                <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${stateConfig.bg} ${stateConfig.color}`}>
                    <span className={`size-1.5 rounded-full ${stateConfig.dot}`} />
                    {stateConfig.label}
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-white/60">
                    <CalendarDays className="size-4 text-primary" />
                    <span className="capitalize">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                    <Tag className="size-4 text-primary" />
                    <span className="capitalize">{event.event_type}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Botón acción */}
            <EventActionButton
                state={event.state}
                loading={actionLoading}
                onStart={handleStart}
                onEnd={handleEnd}
            />
        </div>
    )
}