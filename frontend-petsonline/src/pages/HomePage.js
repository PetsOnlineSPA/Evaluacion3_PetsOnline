import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMascotas, deleteMascota } from '../api/mascotaService';
import { jwtDecode } from "jwt-decode"; 

const HomePage = () => {
    const [mascotas, setMascotas] = useState([]);
    const [esAdmin, setEsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        cargarMascotas();
        verificarRol();
    }, []);

    const verificarRol = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.rol === 'ROLE_ADMIN' || decoded.role === 'ROLE_ADMIN' || decoded.authorities?.includes('ROLE_ADMIN')) {
                    setEsAdmin(true);
                }
            } catch (error) {
                console.error("Error al leer el token", error);
            }
        }
    };

    const cargarMascotas = async () => {
        try {
            const data = await getMascotas();
            setMascotas(data);
        } catch (error) {
            console.error("Error al cargar mascotas", error);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar esta mascota?')) {
            try {
                await deleteMascota(id);
                cargarMascotas(); 
            } catch (error) {
                alert("Error: No tienes permiso para eliminar.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">🐶 Mis Mascotas</h2>
                <div>
                    <button className="btn btn-success me-2" onClick={() => navigate('/mascotas/new')}>
                        + Agregar Mascota
                    </button>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Salir
                    </button>
                </div>
            </div>

            <div className="row">
                {mascotas.length === 0 ? (
                    <div className="col-12"><div className="alert alert-info">No hay mascotas registradas aún.</div></div>
                ) : (
                    mascotas.map((mascota) => (
                        <div className="col-md-4 mb-4" key={mascota.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{mascota.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{mascota.especie}</h6>
                                    <p className="card-text">
                                        <strong>Raza:</strong> {mascota.raza}<br/>
                                        <strong>Edad:</strong> {mascota.edad} años<br/>
                                        <strong>Peso:</strong> {mascota.peso} kg
                                    </p>
                                    <div className="mt-3">
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/mascotas/edit/${mascota.id}`)}>
                                            Editar
                                        </button>
                                        
                                        {/* Solo mostramos ELIMINAR si es ADMIN */}
                                        {esAdmin && (
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(mascota.id)}>
                                                Eliminar
                                            </button>
                                        )}
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

export default HomePage;