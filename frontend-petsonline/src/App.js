import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import LoginPage from './pages/LoginPage'; // <--- Importamos la nueva página

function App() {
  return (
    <div>
      {/* Mostramos directamente el Login */}
      <LoginPage />
    </div>
  );
}

export default App;