import { useEffect, useRef, useState } from 'react'
import { socket } from '@/lib/socket/socket.client.js'
import { SOCKET_EVENTS } from '@/lib/socket/socket.events.js'


export const PHOTO_DURATION = 15000

export function useTransmission() {
    const [queue, setQueue] = useState([])
    const [currentPhoto, setCurrentPhoto] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const timerRef = useRef(null)

    // Conexión al socket
    useEffect(() => {
        socket.connect()
        setIsConnected(true)

        socket.on(SOCKET_EVENTS.NEW_PHOTO, (photo) => {
            setQueue((prev) => [...prev, photo])
        })

        socket.on('disconnect', () => setIsConnected(false))
        socket.on('connect', () => setIsConnected(true))

        return () => {
            socket.off(SOCKET_EVENTS.NEW_PHOTO)
            socket.off('disconnect')
            socket.off('connect')
            socket.disconnect()
        }
    }, [])


    // Avanzar la cola
    useEffect(() => {
        if (currentPhoto || queue.length === 0) return

        const [next, ...rest] = queue
        setCurrentPhoto(next)
        setQueue(rest)
    }, [queue, currentPhoto])


    // Timer por foto
    useEffect(() => {
        if (!currentPhoto) return

        timerRef.current = setTimeout(() => {
            setCurrentPhoto(null)
        }, PHOTO_DURATION)

        return () => clearTimeout(timerRef.current)
    }, [currentPhoto])

    return {
        currentPhoto,
        queue,
        isConnected,
    }
}