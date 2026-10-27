import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wizardStudyImage from '../../assets/Wizard in Study.jpg';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación aquí
    navigate('/home');
  };

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif p-4 md:p-8 flex justify-center items-center relative">
      
      {/* Contenedor Principal (Tarjeta de Login) */}
      <div className="w-full max-w-5xl bg-[#fdfaf3] border-4 border-[#c4a46c] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative min-h-125">
        
        {/* Botón de regreso absoluto en la esquina superior izquierda */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-20 w-10 h-10 bg-[#fdfaf3] border-2 border-[#c4a46c] hover:border-[#8b2e2e] text-[#8c7b61] hover:text-[#8b2e2e] rounded-full flex items-center justify-center transition-colors shadow-sm"
          title="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </button>

        {/* ==========================================
            MITAD IZQUIERDA: Imagen / Ilustración
            * Oculta en móviles (hidden), visible en tablet/PC (md:flex)
        =========================================== */}
        <div className="hidden md:flex w-full md:w-1/2 bg-[#e5d9c5] border-r-4 border-[#c4a46c] relative items-center justify-center overflow-hidden">
          <img
            src={wizardStudyImage}
            alt="Mago estudiando en su biblioteca"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* ==========================================
            MITAD DERECHA: Formulario de Login
        =========================================== */}
        <div className="w-full md:w-1/2 p-8 pt-16 md:p-12 flex flex-col items-center justify-center">
          
          <h1 className="text-3xl md:text-4xl font-black font-epic text-[#2c241b] tracking-wider uppercase mb-8 text-center">
            Inicia sesión
          </h1>

          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-5">
            
            {/* Inputs de credenciales */}
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                name="email"
                placeholder="Correo o nombre de aventurero"
                value={credentials.email}
                onChange={handleChange}
                className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold transition-all shadow-inner placeholder:text-[#a39481]"
                required
              />
              <input 
                type="password" 
                name="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={handleChange}
                className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold transition-all shadow-inner placeholder:text-[#a39481]"
                required
              />
            </div>

            {/* Enlace de recuperación */}
            <div className="flex justify-center w-full mt-1 mb-2">
              <button type="button" onClick={() => navigate('/recuperacion')} className="text-[#3b82f6] hover:text-[#2563eb] font-bold text-sm hover:underline transition-colors">
                Reestablecer Contraseña
              </button>
            </div>

            {/* Botones de redes sociales */}
            <div className="flex flex-col gap-3 w-full">
              <button type="button" className="w-full flex items-center justify-center gap-3 bg-[#fdfaf3] border-2 border-[#c4a46c] hover:bg-[#f4ecd8] text-[#2c241b] font-bold py-3 rounded-xl transition-all shadow-sm active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                Google
              </button>
              
              <button type="button" className="w-full flex items-center justify-center gap-3 bg-[#fdfaf3] border-2 border-[#c4a46c] hover:bg-[#f4ecd8] text-[#2c241b] font-bold py-3 rounded-xl transition-all shadow-sm active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Github
              </button>
            </div>

            {/* Botón principal de login */}
            <button 
              type="submit" 
              className="w-full mt-4 py-4 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold text-lg rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-1 uppercase tracking-widest"
            >
              iniciar sesión
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}