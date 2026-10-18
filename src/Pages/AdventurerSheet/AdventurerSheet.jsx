import { useLocation, useNavigate } from 'react-router-dom';

export default function AdventurerSheet() {
  const navigate = useNavigate();
  const location = useLocation();
  const portrait = location.state?.portrait;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-10 flex justify-center items-start md:items-center">
      
      {/* Contenedor principal de la ficha */}
      <div className="w-full max-w-5xl bg-zinc-900/80 md:bg-zinc-900 border border-transparent md:border-zinc-800 rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl">
        
        {/* ==========================================
            ENCABEZADO
            Móvil: Flecha arriba, título abajo (o alineados si caben)
            Tablet: Flecha y título en la misma línea
        =========================================== */}
        <header className="flex items-center gap-4 mb-8 md:mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-zinc-950 md:bg-zinc-800 border border-zinc-800 md:border-zinc-700 rounded-full hover:bg-zinc-800 hover:border-zinc-600 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-indigo-400 tracking-wide">
            Ficha de aventurero
          </h1>
        </header>

        {/* ==========================================
            FORMULARIO (Grid Responsivo)
        =========================================== */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8 md:gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* --- COLUMNA IZQUIERDA ---[cite: 10, 11] */}
            <div className="flex flex-col gap-6">
              
              <div className="space-y-2">
                <label className="text-sm md:text-base font-bold text-zinc-300 ml-1">
                  Nombre de aventurero
                </label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 md:py-4 focus:border-indigo-500 focus:outline-none text-white transition-all text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm md:text-base font-bold text-zinc-300 ml-1">
                  Clase
                </label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 md:py-4 focus:border-indigo-500 focus:outline-none text-white transition-all text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm md:text-base font-bold text-zinc-300 ml-1">
                  Especialidad
                </label>
                <input 
                  type="text" 
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 md:py-4 focus:border-indigo-500 focus:outline-none text-white transition-all text-lg"
                />
              </div>

            </div>

            {/* --- COLUMNA DERECHA --- */}
            {/* Usamos flexbox para controlar el orden interno según el dispositivo */}
            <div className="flex flex-col gap-6">
              
              {/* TRASFONDO (Móvil: Arriba | Tablet: Abajo) */}
                <div className="space-y-2 order-1 md:order-2 flex flex-col">
                <label className="text-sm md:text-base font-bold text-zinc-300 ml-1">
                    Trasfondo
                </label>
                <textarea 
                    className="w-full min-h-[120px] bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-4 focus:border-indigo-500 focus:outline-none text-white transition-colors resize-y text-lg"
                    placeholder="Escribe la historia de tu aventurero..."
                ></textarea>
                </div>

              {/* RETRATO (Móvil: Abajo | Tablet: Arriba)[cite: 10, 11] */}
              <div className="space-y-2 order-2 md:order-1">
                <label className="text-sm md:text-base font-bold text-zinc-300 ml-1">
                  Retrato de aventurero.
                </label>
                <div className="flex gap-4">
                  {/* Botón de Cámara[cite: 10, 11] */}
                  <button type="button" className="w-24 md:w-32 aspect-square bg-zinc-950 border-2 border-zinc-700 hover:border-indigo-500 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-indigo-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="12" cy="13" r="4"/>
                      <path d="M8 3v4"/>
                      <path d="M16 3v4"/>
                    </svg>
                  </button>

                  {/* Espacio del Retrato[cite: 10, 11] */}
                  <button
                    type="button"
                    onClick={() => navigate('/canvas')}
                    aria-label="Dibujar retrato de aventurero"
                    className="w-24 md:w-32 aspect-square overflow-hidden bg-zinc-950 border-2 border-zinc-700 hover:border-indigo-500 rounded-2xl flex items-center justify-center text-zinc-400 hover:text-indigo-400 font-serif font-bold text-sm md:text-base transition-colors"
                  >
                    {portrait ? (
                      <img src={portrait} alt="Retrato del aventurero" className="w-full h-full object-cover" />
                    ) : (
                      'Dibujar retrato'
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              BOTÓN DE ENVÍO
          =========================================== */}
          <div className="flex justify-center mt-4">
            {/* Ocupa 100% en móvil, pero se centra y toma un ancho máximo en tablet[cite: 10, 11] */}
            <button 
              type="submit" 
              onClick={() => navigate('/home')} // Ajusta al destino que prefieras
              className="w-full md:w-2/3 lg:w-1/2 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold font-serif text-xl border-2 border-zinc-950 rounded-2xl transition-transform active:scale-95 shadow-lg"
            >
              Forjar ficha
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}