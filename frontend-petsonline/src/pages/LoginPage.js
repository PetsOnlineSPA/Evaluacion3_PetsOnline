import React, { useState } from 'react';
import api from '../api/axiosConfig'; // Usamos la configuración que hicimos antes

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('Conectando con el servidor...');

    try {
      // Enviamos el usuario y contraseña al Backend
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });

      // Si funciona, guardamos el token en el navegador
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      setMensaje('¡Login Exitoso! Token guardado.');
      console.log("Token recibido:", token);
      
      // Aquí más adelante te enviaremos a la página principal
    } catch (error) {
      console.error(error);
      setMensaje('Error: Credenciales incorrectas o servidor apagado.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Iniciar Sesión - PetsOnline</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Ingresar
                </button>
              </form>
              
              {mensaje && (
                <div className="alert alert-info mt-3 text-center">
                  {mensaje}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;