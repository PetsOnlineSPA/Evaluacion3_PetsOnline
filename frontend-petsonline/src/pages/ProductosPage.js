import React, { useEffect, useState, useContext } from 'react';
import { getProductos } from '../api/productoService';
import { CartContext } from '../context/CartContext';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await getProductos();
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar productos", error);
        }
    };

    const productosFiltrados = filtro === 'Todos' 
        ? productos 
        : productos.filter(p => p.categoria === filtro);

    const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

    return (
        <div className="container">
            <h2 className="text-center mb-4 text-primary">Tienda de Productos 🦴</h2>

            {/* Filtros Responsivos */}
            <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
                {categorias.map(cat => (
                    <button 
                        key={cat} 
                        className={`btn ${filtro === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFiltro(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grilla Responsiva */}
            <div className="row">
                {productosFiltrados.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No hay productos cargados.
                    </div>
                ) : (
                    productosFiltrados.map((prod) => (
                        <div className="col-12 col-md-6 col-lg-3 mb-4" key={prod.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img 
                                    src={prod.imagenUrl} 
                                    className="card-img-top p-3" 
                                    alt={prod.nombre} 
                                    style={{ height: '200px', objectFit: 'contain' }}
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Producto'; }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-center">{prod.nombre}</h5>
                                    <p className="text-muted small mb-2 text-center">{prod.categoria}</p>
                                    <h4 className="text-success fw-bold text-center">${prod.precio}</h4>
                                    
                                    <div className="mt-auto">
                                        <button 
                                            className="btn btn-warning w-100 fw-bold shadow-sm"
                                            onClick={() => agregarAlCarrito(prod)}
                                        >
                                            + Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductosPage;