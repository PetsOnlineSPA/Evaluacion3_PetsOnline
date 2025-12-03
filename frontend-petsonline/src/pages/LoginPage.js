import React, { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('Conectando con el servidor...');

    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      });

      login(response.data.token);
      
      setMensaje('¡Login Exitoso! Redirigiendo...');
      
      setTimeout(() => {
        navigate('/home');
      }, 1000);

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