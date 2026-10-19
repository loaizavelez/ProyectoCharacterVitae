import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const personajeEncontrado = usuariosDB.find(
      (user) => user.profile.email === credenciales.email && user.profile.password === credenciales.password
    );

    if (personajeEncontrado) {
      localStorage.setItem('usuarioActivo', personajeEncontrado.id);
      navigate('/home');
    } else {
      setError('Las crónicas no registran este correo o contraseña.');
    }
  };

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif flex justify-center px-6 py-10 relative">
      
      {/* Contenedor estilo pergamino[cite: 11] */}
      <div className="w-full max-w-md flex flex-col">
        
        {/* Encabezado Superior[cite: 11] */}
        <header className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate(-1)} className="text-[#2c241b] hover:text-[#8b2e2e] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </button>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/><line x1="12" y1="2" x2="12" y2="15.5"/><line x1="22" y1="15.5" x2="12" y2="15.5"/><line x1="2" y1="15.5" x2="12" y2="15.5"/></svg>
            <span className="font-epic font-bold text-xl tracking-widest text-[#2c241b]">CHARACTER VITAE</span>
          </div>
        </header>

        {/* Título de Sección[cite: 11] */}
        <div className="flex items-center gap-2 mb-2">
          <hr className="w-6 border-[#8b2e2e] border-t-2" />
          <span className="text-[#8b2e2e] text-sm font-bold tracking-wide">Volver</span>
        </div>
        <h1 className="text-4xl font-epic font-black mb-8 tracking-wider text-[#2c241b]">
          INICIA SESIÓN
        </h1>

        {error && (
          <p className="text-[#8b2e2e] font-bold text-center text-sm mb-4 bg-[#8b2e2e]/10 p-2 rounded border border-[#8b2e2e]/30">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          
          {/* Correo del aventurero[cite: 11] */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#4a3f35] ml-1">Correo del aventurero</label>
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b2e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 opacity-80"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input 
                type="email" 
                placeholder="aria@correo.com"
                value={credenciales.email}
                onChange={(e) => {
                  setCredenciales({...credenciales, email: e.target.value});
                  setError('');
                }}
                className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl pl-12 pr-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm"
                required
              />
            </div>
          </div>

          {/* Contraseña[cite: 11] */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#4a3f35] ml-1">Contraseña</label>
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••"
                value={credenciales.password}
                onChange={(e) => {
                  setCredenciales({...credenciales, password: e.target.value});
                  setError('');
                }}
                className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl pl-12 pr-12 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm font-mono tracking-widest"
                required
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

          <div className="flex justify-end mt-[-8px]">
            <button type="button" className="text-sm font-bold text-[#8b2e2e] hover:text-[#6b2323] underline decoration-1 underline-offset-4 transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón Principal[cite: 11] */}
          <div className="mt-2">
            <button type="submit" className="group w-full py-4 px-6 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold rounded-xl flex items-center justify-between transition-all active:scale-95 shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-[4px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 group-hover:text-[#d4af37] transition-colors"><line x1="14.5" y1="17.5" x2="3" y2="6"/><polygon points="21 3 18 3 14 7 17 10 21 6 21 3"/><line x1="3" y1="21" x2="8.5" y2="15.5"/><line x1="17" y1="10" x2="21" y2="14"/><line x1="10" y1="17" x2="14" y2="21"/></svg>
              <span className="text-lg tracking-wide group-hover:text-[#d4af37] transition-colors">Inicia sesión</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100 group-hover:text-[#d4af37] transition-colors"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </button>
           
          </div>

          {/* Separador[cite: 11] */}
          <div className="flex items-center gap-3 my-2">
            <hr className="flex-1 border-[#d0c2a8] border-t-2"/>
            <span className="text-[#8c7b61] text-xs font-bold uppercase tracking-widest">Otras formas de iniciar sesión</span>
            <hr className="flex-1 border-[#d0c2a8] border-t-2"/>
          </div>

          {/* Botones Sociales[cite: 11] */}
          <div className="flex flex-col gap-3">
            <button type="button" className="flex items-center justify-between w-full bg-[#fdfaf3] border-2 border-[#c4a46c] hover:border-[#8c7b61] hover:bg-[#f4ecd8] rounded-xl px-6 py-3.5 text-[#2c241b] font-bold transition-colors shadow-sm">
              <div className="w-6 h-6 rounded flex items-center justify-center font-black text-lg text-blue-600">G</div>
              <span>Entrar con Google</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            
            <button type="button" className="flex items-center justify-between w-full bg-[#fdfaf3] border-2 border-[#c4a46c] hover:border-[#8c7b61] hover:bg-[#f4ecd8] rounded-xl px-6 py-3.5 text-[#2c241b] font-bold transition-colors shadow-sm">
              <div className="w-6 h-6 rounded flex items-center justify-center text-[#2c241b]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <span>Entrar con GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

        </form>
      </div>

      {/* Adorno de esquina (opcional)[cite: 11] */}
      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
      </div>
    </main>
  );
}