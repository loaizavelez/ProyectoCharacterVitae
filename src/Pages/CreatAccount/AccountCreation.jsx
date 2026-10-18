import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountCreation() {
  const navigate = useNavigate();

  // ========================================================
  // LÓGICA DE ESTADOS
  // ========================================================
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [credenciales, setCredenciales] = useState({ email: '', password: '', confirmPassword: '' });
  const [perfil, setPerfil] = useState({ name: '', location: '', educationLevel: '', institution: '' });

  // Avanzar al paso 2
  const validarPaso1 = (e) => {
    e.preventDefault();
    if (credenciales.password !== credenciales.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (credenciales.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const correoExiste = usuariosDB.find(u => u.profile.email === credenciales.email);
    if (correoExiste) {
      setError('Este correo ya está registrado.');
      return;
    }

    setError('');
    setPaso(2);
  };

  // Crear usuario y guardar en DB
  const guardarUsuarioFinal = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      id: Date.now().toString(),
      profile: {
        email: credenciales.email,
        password: credenciales.password,
        name: perfil.name,
        location: perfil.location,
        educationLevel: perfil.educationLevel,
        institution: perfil.institution
      },
      inventory: {
        skills: [],
        tools: [],
        milestones: []
      }
    };

    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    usuariosDB.push(nuevoUsuario);
    localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));

    navigate('/login');
  };

  // ========================================================
  // DISEÑO VISUAL
  // ========================================================
  return (
    <main className="min-h-screen bg-[#0d0d0f] text-zinc-100 font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#18181b] border border-zinc-800/50 p-8 md:p-10 rounded-3xl shadow-2xl">
        
        {paso === 1 && (
          <form onSubmit={validarPaso1} className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#7a73ff] text-center tracking-wide mb-4 drop-shadow-md">
              Crea tu cuenta
            </h1>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-300 ml-1">Ingresa un correo</label>
                <input 
                  type="email" 
                  value={credenciales.email} 
                  onChange={(e) => { setCredenciales({...credenciales, email: e.target.value}); setError(''); }}
                  placeholder="ejemplo@correo.com" required
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-[#5b52ff] focus:ring-1 focus:ring-[#5b52ff] focus:outline-none text-white transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-300 ml-1">Ingresa una contraseña</label>
                <input 
                  type="password" 
                  value={credenciales.password} 
                  onChange={(e) => { setCredenciales({...credenciales, password: e.target.value}); setError(''); }}
                  placeholder="••••••••" required
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3.5 focus:border-[#5b52ff] focus:ring-1 focus:ring-[#5b52ff] focus:outline-none text-white transition-all shadow-inner font-mono tracking-widest"
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-sm font-bold text-zinc-300 ml-1">Confirma tu contraseña</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={credenciales.confirmPassword} 
                    onChange={(e) => { setCredenciales({...credenciales, confirmPassword: e.target.value}); setError(''); }}
                    placeholder="••••••••" required
                    className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3.5 pr-12 focus:border-[#5b52ff] focus:ring-1 focus:ring-[#5b52ff] focus:outline-none text-white transition-all shadow-inner font-mono tracking-widest"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                      {!showPassword && <line x1="2" y1="2" x2="22" y2="22" />}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm font-bold text-center">{error}</p>}

            <div className="flex justify-center gap-4 mt-4">
              <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 bg-[#18181b] border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold rounded-xl transition-colors">
                Volver
              </button>
              <button type="submit" className="px-8 py-3 bg-[#5b52ff] hover:bg-indigo-500 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-[0_0_15px_rgba(91,82,255,0.4)]">
                Siguiente
              </button>
            </div>
          </form>
        )}

        {paso === 2 && (
          <form onSubmit={guardarUsuarioFinal} className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold font-serif text-[#7a73ff] text-center tracking-wide mb-2 drop-shadow-md">
              Datos de personaje
            </h1>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Nombre</label>
                <input 
                  type="text" value={perfil.name} onChange={(e) => setPerfil({...perfil, name: e.target.value})} required
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 focus:border-[#5b52ff] focus:outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Ubicación</label>
                <input 
                  type="text" value={perfil.location} onChange={(e) => setPerfil({...perfil, location: e.target.value})} required
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 focus:border-[#5b52ff] focus:outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Rango académico</label>
                <select 
                  value={perfil.educationLevel} onChange={(e) => setPerfil({...perfil, educationLevel: e.target.value})} required
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 focus:border-[#5b52ff] focus:outline-none text-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Selecciona rango</option>
                  <option value="Bachiller">Bachiller</option>
                  <option value="Técnico/Tecnólogo">Técnico/Tecnólogo</option>
                  <option value="Pregrado">Pregrado</option>
                  <option value="Autodidacta">Autodidacta</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Institución</label>
                <input 
                  type="text" value={perfil.institution} onChange={(e) => setPerfil({...perfil, institution: e.target.value})} required
                  className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-4 py-3 focus:border-[#5b52ff] focus:outline-none text-white"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button type="button" onClick={() => setPaso(1)} className="px-6 py-3 bg-[#18181b] border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold rounded-xl transition-colors">
                Atrás
              </button>
              <button type="submit" className="flex-1 py-3 bg-[#5b52ff] hover:bg-indigo-500 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-[0_0_15px_rgba(91,82,255,0.4)]">
                Crear Cuenta
              </button>
            </div>
          </form>
        )}

      </div>
    </main>
  );
}