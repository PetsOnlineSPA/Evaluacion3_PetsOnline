import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig'; // Usamos axios directo o crea un servicio si prefieres

const ServiciosPage = () => {
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        api.get('/api/servicios').then(res => setServicios(res.data)).catch(console.error);
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center text-primary mb-4">Nuestros Servicios Veterinarios 🏥</h2>
            <div className="row">
                {servicios.map(serv => (
                    <div className="col-md-4 mb-4" key={serv.id}>
                        <div className="card h-100 shadow border-0">
                            <img src={serv.imagenUrl} className="card-img-top" alt={serv.nombre} style={{height: '200px', objectFit: 'cover'}} />
                            <div className="card-body">
                                <h4 className="card-title fw-bold">{serv.nombre}</h4>
                                <p className="card-text text-muted">{serv.descripcion}</p>
                                <h3 className="text-success">${serv.precio}</h3>
                                <button className="btn btn-primary w-100 mt-3">Agendar Hora</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiciosPage;