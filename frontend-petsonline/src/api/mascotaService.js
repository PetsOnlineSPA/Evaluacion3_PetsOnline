import api from './axiosConfig';

// Obtener todas las mascotas del usuario
export const getMascotas = async () => {
    const response = await api.get('/api/mascotas');
    return response.data;
};

// Obtener una mascota por ID (para editar)
export const getMascotaById = async (id) => {
    const response = await api.get(`/api/mascotas/${id}`);
    return response.data;
};

// Crear mascota
export const createMascota = async (mascota) => {
    const response = await api.post('/api/mascotas', mascota);
    return response.data;
};

// Actualizar mascota
export const updateMascota = async (id, mascota) => {
    const response = await api.put(`/api/mascotas/${id}`, mascota);
    return response.data;
};

// Eliminar mascota
export const deleteMascota = async (id) => {
    await api.delete(`/api/mascotas/${id}`);
};