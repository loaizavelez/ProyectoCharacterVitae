import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col p-6 lg:p-12">
      
      {/* ==========================================
          HEADER RESPONSIVO
          Móvil: Solo "Sign In" a la derecha[cite: 12]
          Tablet: "Character Vitae" a la izq, "Sign In" a la der[cite: 13]
      =========================================== */}
      <header className="w-full max-w-6xl mx-auto flex justify-end md:justify-between items-center mb-10 md:mb-16">
        {/* Título: Oculto en móvil (se muestra abajo), visible en tablet/desktop[cite: 13] */}
        <h1 className="hidden md:block text-3xl font-bold font-serif text-indigo-400 tracking-wide">
          Character Vitae
        </h1>
        
        <button 
          onClick={() => navigate('/login')}
          className="px-5 py-2 border-2 border-zinc-700 hover:border-zinc-500 rounded-lg text-sm font-bold tracking-widest transition-colors text-zinc-300 hover:text-white"
        >
          sign in
        </button>
      </header>

      {/* ==========================================
          CONTENIDO PRINCIPAL
          Móvil: 1 sola columna vertical[cite: 12]
          Tablet: Grid de 2 columnas[cite: 13]
      =========================================== */}
      <section className="flex-1 w-full max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16">
        
        {/* --- SECCIÓN IZQUIERDA (O superior en móvil) --- */}
        <div className="flex flex-col justify-center gap-6 md:gap-12 order-1">
          
          {/* Título exclusivo para móvil[cite: 12] */}
          <h1 className="md:hidden text-4xl sm:text-5xl font-bold font-serif text-indigo-400 text-center tracking-wide">
            Character Vitae
          </h1>

          {/* Eslogan[cite: 12, 13] */}
          <p className="text-xl sm:text-2xl text-zinc-300 text-center md:text-left leading-snug font-medium">
            Sube tus proyectos.<br />
            Comparte tus logros.<br />
            <span className="text-indigo-300">Sé tu personaje.</span>
          </p>

          {/* Botón Principal (Versión Tablet/Escritorio)[cite: 13] */}
          <div className="hidden md:block mt-4">
            <button 
              onClick={() => navigate('/registro')} // Ajusta la ruta de registro según tu app
              className="px-8 py-3 bg-zinc-100 hover:bg-white text-zinc-950 border-2 border-transparent font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-lg"
            >
              Crea tu cuenta
            </button>
          </div>
        </div>

        {/* --- SECCIÓN DERECHA (O central en móvil) - Tarjeta de Perfil --- */}
        <div className="flex flex-col justify-center order-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 text-center md:text-left">
            Perfil destacado
          </h2>
          
          {/* Tarjeta con los iconos en las esquinas[cite: 12, 13] */}
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-6 md:p-8 relative shadow-2xl flex flex-col md:aspect-[4/3] justify-center items-center group hover:border-indigo-500/50 transition-colors">
            
            {/* Icono superior izquierdo (Círculo tachado)[cite: 12, 13] */}
            <div className="absolute top-4 left-4 text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </div>
            
            {/* Icono superior derecho (X)[cite: 12, 13] */}
            <div className="absolute top-4 right-4 text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </div>

            {/* Texto de la tarjeta[cite: 12, 13] */}
            <p className="text-lg md:text-xl text-zinc-300 font-medium text-center mt-6">
              Mis proyectos tienen mayor visibilidad
            </p>
          </div>
        </div>

        {/* --- BOTÓN MÓVIL (Al fondo de la pantalla) --- */}
        {/* Solo visible en pantallas pequeñas, empujado hacia abajo[cite: 12] */}
        <div className="md:hidden order-3 mt-auto pt-8 w-full">
          <button 
            onClick={() => navigate('/registro')}
            className="w-full py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl transition-all shadow-lg text-lg border-2 border-zinc-950"
          >
            Crea tu cuenta
          </button>
        </div>

      </section>
    </main>
  );
}