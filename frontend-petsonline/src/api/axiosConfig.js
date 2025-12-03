import axios from 'axios';

// 1. Configurar la URL base de tu Backend (Spring Boot)
const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// 2. Interceptor: Antes de enviar una petición, revisa si hay token guardado
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Busca en la "caja fuerte" del navegador
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Pega el token en la cabecera
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;