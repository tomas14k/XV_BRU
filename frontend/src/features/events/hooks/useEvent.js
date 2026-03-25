import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { eventService } from '../services/eventService'

export function useEvent() {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.get({})
        if (data.length > 0) setEvent(data[0])
      } catch {
        toast.error('Error al cargar el evento')
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [])

  const handleStart = async () => {
    if (!event) return
    try {
      setActionLoading(true)
      const updated = await eventService.start({ id_event: event.id })
      setEvent(updated)
      toast.success('¡Evento iniciado! 🎉')
      navigate(`/organizador/transmision/${event.id}`)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al iniciar el evento')
    } finally {
      setActionLoading(false)
    }
  }

  const handleEnd = async (id_event) => {
    try {
      setActionLoading(true)
      const updated = await eventService.end({ id_event: id_event ?? event?.id })
      setEvent(updated)
      toast.success('Evento finalizado')
      navigate('/organizador')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al finalizar el evento')
    } finally {
      setActionLoading(false)
    }
  }

  return { event, loading, actionLoading, handleStart, handleEnd }
}