import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMascotas, deleteMascota } from '../api/mascotaService';

const HomePage = () => {
    const [mascotas, setMascotas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cargarMascotas();
    }, []);

    const cargarMascotas = async () => {
        try {
            const data = await getMascotas();
            setMascotas(data);
        } catch (error) {
            console.error("Error cargando mascotas", error);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar esta mascota?')) {
            await deleteMascota(id);
            cargarMascotas(); // Recargar la lista
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mis Mascotas 🐾</h2>
                <div>
                    <button className="btn btn-primary me-2" onClick={() => navigate('/mascotas/new')}>
                        + Agregar Mascota
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </div>

            <div className="row">
                {mascotas.length === 0 ? (
                    <div className="alert alert-info">No tienes mascotas registradas aún.</div>
                ) : (
                    mascotas.map((mascota) => (
                        <div className="col-md-4 mb-4" key={mascota.id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{mascota.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{mascota.especie} - {mascota.raza}</h6>
                                    <p className="card-text">
                                        Edad: {mascota.edad} años<br />
                                        Peso: {mascota.peso} kg
                                    </p>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/mascotas/edit/${mascota.id}`)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(mascota.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;