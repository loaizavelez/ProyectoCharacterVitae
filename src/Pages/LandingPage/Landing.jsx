import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const [showFeaturedProfile, setShowFeaturedProfile] = useState(true);

  return (
    <main className="w-full bg-zinc-950 text-zinc-100 font-sans">
      
      {/* =========================================================
          VISTA MÓVIL Y TABLET
          Oculto en escritorio (lg:hidden)
      ========================================================== */}
      <div className="flex flex-col min-h-[100svh] p-6 lg:hidden relative">
        
        {/* Encabezado: Título y Sign In[cite: 26, 27] */}
        <header className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-black font-serif text-indigo-400 text-center md:text-left mt-4 md:mt-0">
            Character Vitae
          </h1>
          <div className="flex justify-end">
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-1.5 border-2 border-zinc-300 text-zinc-300 font-bold rounded-lg text-sm hover:bg-zinc-800 transition-colors shadow-[2px_2px_0px_rgba(212,212,216,1)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
            >
              sign in
            </button>
          </div>
        </header>

        {/* Contenido Principal (1 columna móvil, 2 columnas tablet)[cite: 26, 27] */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-center gap-10 mt-10 md:mt-0">
          
          {/* Lado Izquierdo (Textos y botón en tablet)[cite: 26, 27] */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 gap-8">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-zinc-200 leading-snug">
              Sube tus proyectos.<br/>
              Comparte tus logros<br/>
              Se tu personaje
            </h2>
            
            {/* Botón CTA (Visible solo en Tablet bajo el texto)[cite: 27] */}
            <button 
              onClick={() => navigate('/registro')}
              className="hidden md:block px-8 py-3 bg-zinc-100 hover:bg-zinc-300 text-zinc-950 font-bold font-serif text-lg border-2 border-zinc-950 rounded-xl transition-transform active:scale-95 shadow-lg"
            >
              Crea tu cuenta
            </button>
          </div>

          {/* Lado Derecho (Perfil Destacado)[cite: 26, 27] */}
          {showFeaturedProfile && (
            <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
              <h3 className="text-sm font-bold text-zinc-300 mb-2 ml-1 text-left">
                Perfil destacado
              </h3>
              <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 relative shadow-lg">
                <button 
                  onClick={() => setShowFeaturedProfile(false)}
                  className="absolute top-2 right-3 text-zinc-500 hover:text-zinc-300 font-bold text-lg"
                >
                  x
                </button>
                <div className="flex items-start gap-4 mt-2">
                  <div className="w-10 h-10 shrink-0 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
                  </div>
                  <p className="text-zinc-300 font-medium text-sm md:text-base leading-tight pr-6">
                    Mis proyectos tienen mayor visibilidad
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Botón CTA Inferior (Visible solo en Móvil)[cite: 26] */}
        <div className="mt-auto pt-8 md:hidden w-full">
          <button 
            onClick={() => navigate('/registro')}
            className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-300 text-zinc-950 font-bold font-serif text-lg border-2 border-zinc-950 rounded-xl transition-transform active:scale-95 shadow-lg"
          >
            Crea tu cuenta
          </button>
        </div>

      </div>

      {/* =========================================================
          VISTA ESCRITORIO (Diapositivas y Snap)
          Oculto en móvil y tablet (hidden lg:block)
      ========================================================== */}
      <div className="hidden lg:block h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        
        {/* Bloque 1: Bienvenida */}
        <section className="relative flex flex-col items-center justify-center h-screen snap-start overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/ruta-a-tu-imagen-generada.jpg" 
              alt="Fondo Character Vitae" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 text-center flex flex-col items-center">
            <h1 className="text-8xl font-black font-serif text-indigo-400 tracking-wide mb-6 drop-shadow-2xl">
              Character Vitae
            </h1>
            <div className="flex flex-col items-center gap-2 mt-16 opacity-60 animate-bounce">
              <span className="text-xs uppercase tracking-widest font-bold">Inicia tu aventura</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </section>

        {/* Bloque 2: Características */}
        <section className="flex flex-col items-center justify-center bg-zinc-900 px-6 h-screen snap-start relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
          <div className="max-w-4xl text-center space-y-12">
            <h2 className="text-7xl font-bold font-serif text-zinc-100 leading-tight hover:scale-105 transition-transform duration-500">Sube tus proyectos.</h2>
            <h2 className="text-7xl font-bold font-serif text-zinc-400 leading-tight hover:scale-105 transition-transform duration-500">Comparte tus logros.</h2>
            <h2 className="text-7xl font-bold font-serif text-indigo-400 leading-tight hover:scale-105 transition-transform duration-500">Sé tu personaje.</h2>
          </div>
        </section>

        {/* Bloque 3: Crear cuenta */}
        <section className="flex flex-col items-center justify-center bg-zinc-950 h-screen snap-start relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
          <div className="text-center flex flex-col items-center px-4">
            <div className="mb-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500/50 mx-auto mb-6 w-16 h-16"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <p className="text-zinc-400 text-xl font-medium tracking-wide">Tu gremio te está esperando.</p>
            </div>
            <button onClick={() => navigate('/registro')} className="px-12 py-5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold font-serif text-3xl border-4 border-transparent hover:border-indigo-500 rounded-2xl transition-all active:scale-95 hover:shadow-[0_0_50px_rgba(99,102,241,0.4)]">
              Crea tu cuenta
            </button>
          </div>
        </section>

      </div>

    </main>
  );
}