import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CarritoPage = () => {
    const { carrito } = useContext(CartContext);
    const navigate = useNavigate();

    // Sumar el total
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">🛒 Tu Carrito de Compras</h2>

            {carrito.length === 0 ? (
                <div className="text-center mt-5">
                    <div className="alert alert-warning d-inline-block p-4">
                        <h4>Tu carrito está vacío 😢</h4>
                        <p>¡Ve a la tienda y encuentra algo genial para tu mascota!</p>
                        <button className="btn btn-primary mt-2" onClick={() => navigate('/productos')}>
                            Ir a la Tienda
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm border-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Producto</th>
                                            <th>Categoría</th>
                                            <th className="text-end">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrito.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="me-2">📦</span>
                                                        {item.nombre}
                                                    </div>
                                                </td>
                                                <td><span className="badge bg-secondary">{item.categoria}</span></td>
                                                <td className="text-end fw-bold">${item.precio}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="table-dark">
                                        <tr>
                                            <td colSpan="2" className="text-end fw-bold fs-5">TOTAL A PAGAR:</td>
                                            <td className="text-end fw-bold fs-5 text-warning">${total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="card-footer bg-white py-3 d-flex justify-content-between">
                                <button className="btn btn-outline-secondary" onClick={() => navigate('/productos')}>
                                    ← Seguir Comprando
                                </button>
                                <button className="btn btn-success fw-bold px-4" onClick={() => alert("¡Proceso de pago en construcción!")}>
                                    Pagar Ahora 💳
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarritoPage;