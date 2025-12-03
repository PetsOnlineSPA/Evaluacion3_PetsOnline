import api from './axiosConfig';

export const getMascotas = async () => {
    const response = await api.get('/api/mascotas');
    return response.data;
};

export const getMascotaById = async (id) => {
    const response = await api.get(`/api/mascotas/${id}`);
    return response.data;
};

export const createMascota = async (mascota) => {
    const response = await api.post('/api/mascotas', mascota);
    return response.data;
};

export const updateMascota = async (id, mascota) => {
    const response = await api.put(`/api/mascotas/${id}`, mascota);
    return response.data;
};

export const deleteMascota = async (id) => {
    await api.delete(`/api/mascotas/${id}`);
};