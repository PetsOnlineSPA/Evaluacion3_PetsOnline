import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MascotaFormPage from './pages/MascotaFormPage';
import ProductosPage from './pages/ProductosPage'; 
import Navbar from './components/Navbar'; 
import ContactoPage from './pages/ContactoPage';
import LandingPage from './pages/LandingPage';
import ServiciosPage from './pages/ServiciosPage';
import CarritoPage from './pages/CarritoPage'; 

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <Navbar /> 
        <div className="pb-5">
            {children}
        </div>
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* --- RUTAS PRIVADAS --- */}
        <Route path="/home" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
        <Route path="/mis-mascotas" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/servicios" element={<ProtectedRoute><ServiciosPage /></ProtectedRoute>} />
        <Route path="/productos" element={<ProtectedRoute><ProductosPage /></ProtectedRoute>} />
        <Route path="/contacto" element={<ProtectedRoute><ContactoPage /></ProtectedRoute>} />
        
        {/* NUEVA RUTA CARRITO */}
        <Route path="/carrito" element={<ProtectedRoute><CarritoPage /></ProtectedRoute>} />

        <Route path="/mascotas/new" element={<ProtectedRoute><MascotaFormPage /></ProtectedRoute>} />
        <Route path="/mascotas/edit/:id" element={<ProtectedRoute><MascotaFormPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;