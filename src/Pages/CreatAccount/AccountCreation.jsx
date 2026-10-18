import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountCreation() {
  const navigate = useNavigate();

  
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState('');
  
  const [credenciales, setCredenciales] = useState({ email: '', password: '', confirmPassword: '' });
  const [perfil, setPerfil] = useState({ name: '', location: '', educationLevel: '', institution: '' });

  const validarPaso1 = (e) => {
    // ... (código de validación del paso 1)
  };

  const guardarUsuarioFinal = (e) => {
    // ... (código de guardado del paso 2)
  };

  // ========================================================
  // 2. AQUÍ VA TU DISEÑO (EL QUE YA TIENES ARMADO)
  // ========================================================
  return (
    <main className="tu-fondo-oscuro">
      
      {/* Si el estado "paso" es 1, mostramos la pantalla de tu imagen */}
      {paso === 1 && (
        <div className="tu-tarjeta-de-crear-cuenta">
          <h1>Crea tu cuenta</h1>
          
          {/* Ejemplo de cómo conectar un input */}
          <input 
            type="email"
            value={credenciales.email} 
            onChange={(e) => setCredenciales({...credenciales, email: e.target.value})}
          />
          
          {/* Conectas la función al botón Siguiente */}
          <button onClick={validarPaso1}>
            Siguiente
          </button>
        </div>
      )}

      {/* Si el estado "paso" cambia a 2, ocultamos lo anterior y mostramos esto */}
      {paso === 2 && (
        <div className="tu-tarjeta-de-datos-personales">
          <h1>Datos del personaje</h1>
          
          {/* Ejemplo de cómo conectar un input del perfil */}
          <input 
            type="text"
            value={perfil.name} 
            onChange={(e) => setPerfil({...perfil, name: e.target.value})}
          />

          {/* Conectas la función final al último botón */}
          <button onClick={guardarUsuarioFinal}>
            Crear Cuenta
          </button>
        </div>
      )}

    </main>
  );
}