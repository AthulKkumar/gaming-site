import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Auth API
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    getCurrentUser: () => api.get('/auth/me')
}

// Game API
export const gameAPI = {
    recordResult: (gameData) => api.post('/games/result', gameData),
    checkAccess: (game) => api.get(`/games/access/${game}`),
    getUserStats: (game) => api.get('/games/stats', { params: { game } }),
    getLeaderboard: (game, limit = 10) => api.get(`/games/leaderboard/${game}`, { params: { limit } }),
    guestComplete: (gameData) => api.post('/games/guest-complete', gameData)
}

// User API
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    getLeaderboard: (limit = 10) => api.get('/users/leaderboard', { params: { limit } }),
    getAllUsers: () => api.get('/users/all')
}

export default api 