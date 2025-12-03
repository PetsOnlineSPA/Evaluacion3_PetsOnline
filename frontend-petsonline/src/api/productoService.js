import api from './axiosConfig';

// Obtener la lista de productos (Público)
export const getProductos = async () => {
    const response = await api.get('/api/productos');
    return response.data;
};

// Crear producto (Solo Admin)
export const createProducto = async (producto) => {
    const response = await api.post('/api/productos', producto);
    return response.data;
};

// Eliminar producto (Solo Admin)
export const deleteProducto = async (id) => {
    await api.delete(`/api/productos/${id}`);
};