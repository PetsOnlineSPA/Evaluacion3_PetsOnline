import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid p-0">
            {/* Hero Section (Portada) */}
            <div className="bg-primary text-white text-center py-5" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1548767797-d8c844163c4c)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="container py-5">
                    <h1 className="display-3 fw-bold">Bienvenido a PetsOnline 🐾</h1>
                    <p className="lead mb-4">La mejor salud y cuidado para los consentidos del hogar.</p>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-warning btn-lg fw-bold" onClick={() => navigate('/servicios')}>Reservar Hora</button>
                        <button className="btn btn-outline-light btn-lg fw-bold" onClick={() => navigate('/productos')}>Ver Tienda</button>
                    </div>
                </div>
            </div>

            {/* Sección de Resumen */}
            <div className="container my-5">
                <div className="row text-center">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm p-3">
                            <div className="h1 text-primary">🩺</div>
                            <h3 className="h5 fw-bold">Veterinaria Expertos</h3>
                            <p className="text-muted">Contamos con los mejores especialistas para tu mascota.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm p-3">
                            <div className="h1 text-success">🦴</div>
                            <h3 className="h5 fw-bold">Tienda Completa</h3>
                            <p className="text-muted">Alimentos, juguetes y accesorios de primera calidad.</p>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm p-3">
                            <div className="h1 text-warning">✂️</div>
                            <h3 className="h5 fw-bold">Estética Canina</h3>
                            <p className="text-muted">Déjalos hermosos con nuestros servicios de spa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;