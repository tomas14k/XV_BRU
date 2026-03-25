export const ENDPOINTS = {
    AUTH: {
        register: '/api/auth/register',
        login: '/api/auth/login',
    },
    EVENTS: {
        create: '/api/event/create',
        getByOrganizer: '/api/event',
        start: (id_event) => `/api/event/${id_event}/start`,
        end: (id_event) => `/api/event/${id_event}/end`,
    }
}