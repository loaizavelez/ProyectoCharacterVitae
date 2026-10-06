import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Cambiamos "email" por eso "username"
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de acceso:', { username, password });

    // Redirigimos al canvas
    navigate('/canvas'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
        
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Accede a tu portafolio de Character Vitae
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-zinc-300">
              Usuario
            </label>
            <div className="mt-2">
              {/* AQUÍ ESTÁ EL CAMBIO CLAVE: type="text" en lugar de type="email" */}
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 flex justify-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors"
          >
            Entrar
          </button>
        </form>
        
      </div>
    </div>
  );
}