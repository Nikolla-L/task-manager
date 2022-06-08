import axios from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = params => {
    return qs.stringify(params, {arrayFormat: 'repeat'})
}

export const API = axios.create({
    // baseURL: 'http://localhost:3001/api',
    baseURL: 'https://task-manager-citycom.netlify.app',
    timeout: 15000
})

API.interceptors.request.use((req: any) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')?.token}`
    }
    return req;
});

API.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.status === 401) {
            if (localStorage.getItem('user')) {
                localStorage.removeItem('user')
                window.location.reload()
            } else {
                return error.response
            }
        } else {
            return Promise.reject(error)
        }
    }
);