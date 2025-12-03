import React, { useState } from 'react';

const ContactoPage = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errores[name]) {
            setErrores({ ...errores, [name]: '' });
        }
    };

    const validar = () => {
        let nuevosErrores = {};
        if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!formData.email.trim()) {
            nuevosErrores.email = "El correo es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            nuevosErrores.email = "Formato de correo inválido.";
        }
        if (!formData.mensaje.trim()) nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
        
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            setEnviado(true);
            setTimeout(() => {
                setEnviado(false);
                setFormData({ nombre: '', email: '', mensaje: '' });
                alert("¡Mensaje enviado con éxito! 🚀");
            }, 2000);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow col-md-8 mx-auto border-0">
                <div className="card-header bg-primary text-white text-center py-3">
                    <h3 className="mb-0">Contáctanos 📬</h3>
                    <p className="mb-0 small">Estamos aquí para ayudar a tus mascotas</p>
                </div>
                <div className="card-body p-4">
                    {enviado ? (
                        <div className="alert alert-success text-center">
                            <h4>¡Gracias por escribirnos!</h4>
                            <p>Te responderemos a la brevedad.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    name="nombre"
                                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Ej: Juan Pérez"
                                />
                                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ej: juan@ejemplo.com"
                                />
                                {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Mensaje</label>
                                <textarea 
                                    name="mensaje"
                                    rows="4"
                                    className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    placeholder="Cuéntanos en qué podemos ayudarte..."
                                ></textarea>
                                {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg fw-bold">
                                    Enviar Mensaje
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactoPage;