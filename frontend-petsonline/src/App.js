import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MascotaFormPage from './pages/MascotaFormPage';
import ProductosPage from './pages/ProductosPage'; // Página de la Tienda
import Navbar from './components/Navbar'; // Tu barra de navegación
import ContactoPage from './pages/ContactoPage';

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" />;
    }
    return (
      <>
        <Navbar /> {/* La barra aparecerá arriba en todas las páginas privadas */}
        <div className="py-4">
            {children}
        </div>
      </>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Login es público, no lleva Navbar */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rutas Privadas (Llevan Navbar) */}
        <Route path="/home" element={
            <ProtectedRoute><HomePage /></ProtectedRoute>
        } />

        <Route path="/mascotas/new" element={
            <ProtectedRoute><MascotaFormPage /></ProtectedRoute>
        } />

        <Route path="/mascotas/edit/:id" element={
            <ProtectedRoute><MascotaFormPage /></ProtectedRoute>
        } />

        <Route path="/contacto" element={
            <ProtectedRoute><ContactoPage /></ProtectedRoute>
        } />

        {/* RUTA DE LA TIENDA */}
        <Route path="/productos" element={
            <ProtectedRoute><ProductosPage /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;