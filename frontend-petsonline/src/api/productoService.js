import api from './axiosConfig';

export const getProductos = async () => {
    const response = await api.get('/api/productos');
    return response.data;
};

export const createProducto = async (producto) => {
    const response = await api.post('/api/productos', producto);
    return response.data;
};

export const deleteProducto = async (id) => {
    await api.delete(`/api/productos/${id}`);
};