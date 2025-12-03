import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMascota, getMascotaById, updateMascota } from '../api/mascotaService';

const MascotaFormPage = () => {
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            cargarMascota();
        }
    }, [id]);

    const cargarMascota = async () => {
        try {
            const data = await getMascotaById(id);
            setNombre(data.nombre);
            setEspecie(data.especie);
            setRaza(data.raza);
            setEdad(data.edad);
            setPeso(data.peso);
        } catch (error) {
            console.error("Error al cargar datos", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mascota = { nombre, especie, raza, edad, peso };
        try {
            if (id) {
                await updateMascota(id, mascota);
            } else {
                await createMascota(mascota);
            }
            // CORRECCIÓN: Redirigir a la lista de mascotas, no al Home
            navigate('/mis-mascotas'); 
        } catch (error) {
            alert("Error al guardar la mascota");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow col-md-8 mx-auto">
                <div className="card-header bg-dark text-white">
                    <h4>{id ? 'Editar Mascota' : 'Nueva Mascota'}</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Especie</label>
                            <input type="text" className="form-control" value={especie} onChange={(e) => setEspecie(e.target.value)} placeholder="Ej: Perro, Gato" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Raza</label>
                            <input type="text" className="form-control" value={raza} onChange={(e) => setRaza(e.target.value)} required />
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Edad (años)</label>
                                <input type="number" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Peso (kg)</label>
                                <input type="number" step="0.1" className="form-control" value={peso} onChange={(e) => setPeso(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success me-2">Guardar</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/mis-mascotas')}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MascotaFormPage;