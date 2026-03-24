import { useState } from "react"
import { eventService } from "../services/eventService"

export function useCreateEvent() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createEvent = async (formData) => {
        try {
            setLoading(true)
            setError(null)

            const data = await eventService.create(formData)
            return data
        } catch (err) {
            setError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return {
        createEvent,
        loading,
        error,
    }
}