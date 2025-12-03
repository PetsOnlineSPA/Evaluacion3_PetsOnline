import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { cantidadEnCarrito } = useContext(CartContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-0 shadow px-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-warning" to="/home">
                    🐾 PetsOnline
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/home">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/mis-mascotas">Mis Mascotas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/servicios">Servicios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/productos">Tienda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/contacto">Contacto</Link>
                        </li>
                    </ul>
                    
                    <div className="d-flex align-items-center gap-3">
                        {/* Carrito Clickeable */}
                        <div 
                            className="btn btn-outline-light position-relative border-0" 
                            onClick={() => navigate('/carrito')}
                            style={{cursor: 'pointer'}}
                            title="Ver mi carrito"
                        >
                            🛒 <span className="d-none d-md-inline">Carrito</span>
                            {cantidadEnCarrito > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cantidadEnCarrito}
                                </span>
                            )}
                        </div>

                        {/* Usuario */}
                        {user && (
                            <div className="text-end d-none d-lg-block">
                                <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>Conectado como</small>
                                <span className="text-white small">{user.email}</span>
                            </div>
                        )}
                        
                        <button className="btn btn-danger btn-sm fw-bold" onClick={handleLogout}>
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;