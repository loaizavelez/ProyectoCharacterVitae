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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setError('Este correo ya está registrado en los archivos.');
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
    localStorage.setItem('usuarioActivo', nuevoUsuario.id);

    navigate('/sheet');
  };

  // ========================================================
  // DISEÑO VISUAL
  // ========================================================
  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif flex justify-center px-6 py-10 relative">
      
      {/* Contenedor estilo pergamino */}
      <div className="w-full max-w-md flex flex-col">
        
        {/* Encabezado Superior */}
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="text-[#2c241b] hover:text-[#8b2e2e] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/><line x1="12" y1="2" x2="12" y2="15.5"/><line x1="22" y1="15.5" x2="12" y2="15.5"/><line x1="2" y1="15.5" x2="12" y2="15.5"/></svg>
            <span className="font-epic font-bold text-xl tracking-widest text-[#2c241b]">CHARACTER VITAE</span>
          </div>
        </header>

        {paso === 1 && (
          <form onSubmit={validarPaso1} className="flex flex-col gap-5">
            
            {/* Título de Sección con nuevo diseño[cite: 13] */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <hr className="w-6 border-[#8b2e2e] border-t-2" />
                <span className="text-[#8b2e2e] text-xs font-bold tracking-wider uppercase">El origen de tu leyenda</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b2e2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            
            <h1 className="text-4xl font-epic font-black tracking-wider text-[#2c241b] uppercase">
              Crea tu personaje
            </h1>
            <p className="text-[#4a3f35] font-medium text-[15px] mb-4">
              Todo héroe comienza con un nombre y una historia.
            </p>

            {error && (
              <p className="text-[#8b2e2e] font-bold text-center text-sm bg-[#8b2e2e]/10 p-2 rounded border border-[#8b2e2e]/30">
                {error}
              </p>
            )}

            <div className="space-y-4">
              {/* Correo Electrónico[cite: 13] */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Correo electrónico</label>
                <input 
                  type="email" 
                  value={credenciales.email} 
                  onChange={(e) => { setCredenciales({...credenciales, email: e.target.value}); setError(''); }}
                  placeholder="aria@correo.com" required
                  className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm"
                />
              </div>

              {/* Contraseña[cite: 13] */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Contraseña</label>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={credenciales.password} 
                    onChange={(e) => { setCredenciales({...credenciales, password: e.target.value}); setError(''); }}
                    placeholder="••••••••••••" required
                    className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl pl-4 pr-12 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm font-mono tracking-widest"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-[#8c7b61] hover:text-[#2c241b] transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmar Contraseña[cite: 13] */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Confirmar contraseña</label>
                <div className="relative flex items-center">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={credenciales.confirmPassword} 
                    onChange={(e) => { setCredenciales({...credenciales, confirmPassword: e.target.value}); setError(''); }}
                    placeholder="••••••••••••" required
                    className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl pl-4 pr-12 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm font-mono tracking-widest"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-[#8c7b61] hover:text-[#2c241b] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Términos y Condiciones[cite: 13] */}
            <p className="text-[11px] text-[#8c7b61] leading-relaxed mt-2 font-medium">
              Al comenzar, aceptas los <a href="#" className="text-[#8b2e2e] underline decoration-1 underline-offset-2">Términos del gremio</a> y la <a href="#" className="text-[#8b2e2e] underline decoration-1 underline-offset-2">Política de privacidad</a>.
            </p>

            {/* Botón Siguiente (con estilo de Iniciar Sesión del diseño)[cite: 13] */}
            <button type="submit" className="w-full py-4 mt-2 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-[4px] tracking-wide text-lg">
              Siguiente
            </button>

            {/* Decoraciones inferiores[cite: 13] */}
            <div className="flex flex-col items-center gap-4 mt-4 opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="#c4a46c" stroke="#c4a46c" strokeWidth="2"><polygon points="12 2 22 12 12 22 2 12"/></svg>
              <div className="flex items-center w-full justify-center gap-4">
                <hr className="w-16 border-[#c4a46c] border-t-1" />
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="2"><polygon points="12 2 22 12 12 22 2 12"/></svg>
                <hr className="w-16 border-[#c4a46c] border-t-1" />
              </div>
            </div>

          </form>
        )}

        {paso === 2 && (
          <form onSubmit={guardarUsuarioFinal} className="flex flex-col gap-6 animate-fade-in">
            
            <div className="flex items-center gap-2 mb-2">
              <hr className="w-6 border-[#8b2e2e] border-t-2" />
              <span className="text-[#8b2e2e] text-xs font-bold tracking-wider uppercase">Tus atributos</span>
            </div>

            <h1 className="text-4xl font-epic font-black tracking-wider text-[#2c241b] uppercase">
              Datos de personaje
            </h1>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Nombre</label>
                <input 
                  type="text" value={perfil.name} onChange={(e) => setPerfil({...perfil, name: e.target.value})} required
                  className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Ubicación</label>
                <input 
                  type="text" value={perfil.location} onChange={(e) => setPerfil({...perfil, location: e.target.value})} required
                  className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Rango académico</label>
                <div className="relative">
                  <select 
                    value={perfil.educationLevel} onChange={(e) => setPerfil({...perfil, educationLevel: e.target.value})} required
                    className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="" disabled>Selecciona rango</option>
                    <option value="Bachiller">Bachiller</option>
                    <option value="Técnico/Tecnólogo">Técnico/Tecnólogo</option>
                    <option value="Pregrado">Pregrado</option>
                    <option value="Autodidacta">Autodidacta</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Institución / Gremio</label>
                <input 
                  type="text" value={perfil.institution} onChange={(e) => setPerfil({...perfil, institution: e.target.value})} required
                  className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] shadow-sm"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button type="button" onClick={() => setPaso(1)} className="px-6 py-4 bg-[#fdfaf3] border-2 border-[#c4a46c] hover:bg-[#f4ecd8] text-[#2c241b] font-bold rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#c4a46c] active:shadow-none active:translate-y-[4px]">
                Atrás
              </button>
              <button type="submit" className="flex-1 py-4 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-[4px] tracking-wide text-lg">
                Forjar Leyenda
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Adorno de esquina */}
      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
      </div>
    </main>
  );
}