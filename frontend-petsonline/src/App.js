import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MascotaFormPage from './pages/MascotaFormPage'; // Importamos el formulario

function App() {
  
  // Protección: Si no hay token, te manda al login
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/home" element={
            <ProtectedRoute><HomePage /></ProtectedRoute>
        } />

        {/* Ruta para Crear */}
        <Route path="/mascotas/new" element={
            <ProtectedRoute><MascotaFormPage /></ProtectedRoute>
        } />

        {/* Ruta para Editar (recibe el ID) */}
        <Route path="/mascotas/edit/:id" element={
            <ProtectedRoute><MascotaFormPage /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;