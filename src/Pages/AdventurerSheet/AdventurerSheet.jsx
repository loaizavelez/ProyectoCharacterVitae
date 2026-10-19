import { useLocation, useNavigate } from 'react-router-dom';

export default function AdventurerSheet() {
  const navigate = useNavigate();
  const location = useLocation();
  const portrait = location.state?.portrait;

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif p-4 md:p-10 flex justify-center items-start md:items-center relative">
      
      {/* Marca de agua decorativa de pergamino (opcional) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%238c7b61\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')"}}></div>

      {/* Contenedor principal de la ficha */}
      <div className="w-full max-w-5xl bg-[#fdfaf3]/90 md:bg-[#fdfaf3] border-4 border-[#c4a46c] rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl relative z-10">
        
        {/* Detalles en las esquinas del pergamino */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -top-1 -left-1 opacity-50"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -bottom-1 -right-1 opacity-50 rotate-180"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>

        {/* ==========================================
            ENCABEZADO
        =========================================== */}
        <header className="flex items-center gap-4 mb-8 md:mb-12 border-b-2 border-[#8b2e2e] pb-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-[#2c241b] hover:text-[#8b2e2e] transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black font-epic text-[#2c241b] tracking-wider uppercase leading-none">
              Ficha de Aventurero
            </h1>
            <span className="text-[#8b2e2e] text-xs md:text-sm font-bold tracking-widest uppercase mt-1">Registro oficial del gremio</span>
          </div>
        </header>

        {/* ==========================================
            FORMULARIO (Grid Responsivo)
        =========================================== */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8 md:gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* --- COLUMNA IZQUIERDA --- */}
            <div className="flex flex-col gap-6">
              
              <div className="space-y-1.5">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Nombre de aventurero
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 md:py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold text-lg md:text-xl transition-all shadow-inner"
                  placeholder="Ej. Sir Galahad"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Clase
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 md:py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold text-lg md:text-xl transition-all shadow-inner"
                  placeholder="Ej. Paladín, Hechicero..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Especialidad
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 md:py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold text-lg md:text-xl transition-all shadow-inner"
                  placeholder="Ej. Magia Arcana, Combate Pesado..."
                />
              </div>

            </div>

            {/* --- COLUMNA DERECHA --- */}
            <div className="flex flex-col gap-6">
              
              {/* TRASFONDO */}
              <div className="space-y-1.5 order-1 md:order-2 flex flex-col">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Trasfondo
                </label>
                <textarea 
                  className="w-full min-h-[140px] bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] transition-colors resize-y text-base md:text-lg shadow-inner leading-relaxed"
                  placeholder="Cuenta la historia de tu origen. Las cicatrices de batallas pasadas y los anhelos de gloria futura..."
                ></textarea>
              </div>

              {/* RETRATO */}
              <div className="space-y-1.5 order-2 md:order-1 border-b-2 md:border-b-0 border-[#d0c2a8] pb-6 md:pb-0 mb-2 md:mb-0">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider block">
                  Retrato de aventurero
                </label>
                <div className="flex gap-4 mt-2">
                  
                  {/* Botón de Cámara */}
                  <button type="button" className="w-24 md:w-32 aspect-square bg-[#f4ecd8] border-2 border-[#c4a46c] hover:border-[#8b2e2e] rounded-2xl flex flex-col items-center justify-center text-[#8c7b61] hover:text-[#8b2e2e] transition-colors shadow-sm group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="12" cy="13" r="4"/>
                      <path d="M8 3v4"/>
                      <path d="M16 3v4"/>
                    </svg>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Capturar</span>
                  </button>

                  {/* Espacio del Retrato */}
                  <button
                    type="button"
                    onClick={() => navigate('/canvas')}
                    aria-label="Dibujar retrato de aventurero"
                    className="w-24 md:w-32 aspect-square overflow-hidden bg-[#f4ecd8] border-2 border-dashed border-[#8c7b61] hover:border-[#8b2e2e] rounded-2xl flex items-center justify-center text-[#8c7b61] hover:text-[#8b2e2e] font-serif font-bold text-sm md:text-base transition-colors shadow-sm relative group"
                  >
                    {portrait ? (
                      <img src={portrait} alt="Retrato del aventurero" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-70 group-hover:scale-110 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                        <span className="text-[11px] uppercase tracking-widest text-center px-2">Esbozar rostro</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              BOTÓN DE ENVÍO
          =========================================== */}
          <div className="flex justify-center mt-6 pt-6 border-t-2 border-[#d0c2a8]">
            <button 
              type="submit" 
              onClick={() => navigate('/home')}
              className="w-full md:w-2/3 lg:w-1/2 py-4 md:py-5 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold font-epic tracking-widest text-xl md:text-2xl rounded-2xl transition-all active:scale-95 shadow-[0_6px_0_#4a1616] active:shadow-none active:translate-y-[6px] uppercase"
            >
              Sellar Ficha
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}