import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans relative flex items-center justify-center p-6 overflow-hidden">
      
      {/* ==========================================
          FONDO (Visible solo en Tablet/Escritorio)[cite: 21]
      =========================================== */}
      <div className="hidden md:block absolute inset-0 z-0">
        {/* SVG que simula la imagen de fondo con la X del wireframe[cite: 21] */}
        <svg className="absolute inset-0 w-full h-full text-zinc-800/60" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        
        {/* Etiqueta de la imagen simulada */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-[15vh]">
          <span className="bg-zinc-900/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-zinc-700 text-zinc-500 font-bold tracking-widest uppercase text-sm shadow-lg">
            Fondo del sitio
          </span>
        </div>

        {/* Capa de oscurecimiento suave para no asfixiar el formulario */}
        <div className="absolute inset-0 bg-zinc-950/40"></div>
      </div>

      {/* ==========================================
          BOTÓN DE RETROCESO[cite: 21]
      =========================================== */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-10 md:left-10 p-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition-colors group z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
      </button>

      {/* ==========================================
          CONTENEDOR DEL FORMULARIO[cite: 21]
      =========================================== */}
      <div className="relative z-10 w-full max-w-sm bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 p-8 rounded-3xl shadow-2xl flex flex-col gap-6">
        
        <h1 className="text-3xl font-bold font-serif text-indigo-400 text-center tracking-wide mb-2">
          Inicia sesión
        </h1>

        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
          
          {/* Campos de texto[cite: 21] */}
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Correo electrónico"
              className="w-full bg-zinc-950/80 border-2 border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none text-white transition-colors"
              required
            />
            <input 
              type="password" 
              placeholder="Contraseña"
              className="w-full bg-zinc-950/80 border-2 border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none text-white transition-colors"
              required
            />
          </div>

          {/* Enlace: Restablecer contraseña[cite: 21] */}
          <div className="flex justify-start">
            <button 
              type="button" 
              className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Reestablecer Contraseña
            </button>
          </div>

          {/* Botones Sociales[cite: 21] */}
          <div className="flex flex-col gap-3 mt-2">
            <button 
              type="button" 
              className="flex items-center justify-center relative w-full bg-zinc-950/80 border-2 border-zinc-700 hover:border-zinc-500 rounded-xl px-4 py-3 text-zinc-200 font-bold transition-colors"
            >
              <div className="absolute left-4 w-6 h-6 bg-zinc-100 rounded flex items-center justify-center text-zinc-900 font-black text-xs">
                G
              </div>
              Google
            </button>
            
            <button 
              type="button" 
              className="flex items-center justify-center relative w-full bg-zinc-950/80 border-2 border-zinc-700 hover:border-zinc-500 rounded-xl px-4 py-3 text-zinc-200 font-bold transition-colors"
            >
              <div className="absolute left-4 w-6 h-6 bg-zinc-800 border border-zinc-600 rounded flex items-center justify-center text-white font-black text-xs">
                Git
              </div>
              Github
            </button>
          </div>

          {/* Botón Principal: Iniciar sesión[cite: 21] */}
          <div className="mt-4">
            <button 
              type="submit" 
              className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-300 text-zinc-950 font-bold font-serif text-xl border-2 border-zinc-950 rounded-xl transition-transform active:scale-95 shadow-lg"
            >
              iniciar sesión
            </button>
          </div>

        </form>
      </div>

    </main>
  );
}