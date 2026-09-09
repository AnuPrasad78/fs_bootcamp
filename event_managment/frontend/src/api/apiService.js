import axios from 'axios';

const API_URL = 'http://localhost:8090/api';
//  axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'}});

// jwt to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});


//for auth
export const register = (regBody) => api.post('/auth/register', regBody);
export const login = (loginBody) => api.post('/auth/login', loginBody);

// events 
export const getEvents = () => api.get('/events');
export const filterEvents = (filterParameters) => api.get('/events/filter', { params: filterParameters });
export const createEvent = (eventBody) => api.post('/events', eventBody);
export const rsvpToEvent = (eventId, attendeeData) => api.post(`/events/${eventId}/rsvp`, attendeeData);

export default api;