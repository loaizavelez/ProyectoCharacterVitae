import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  // Estado para controlar si la estrella está expandida o no
  const [starExpanded, setStarExpanded] = useState(false);
  
  // Estado para la lista dinámica de herramientas
  const [toolsList, setToolsList] = useState([]);
  const [milestonesList, setMilestonesList] = useState([]);

  // Leer los elementos guardados al cargar la página
  useEffect(() => {
    const savedTools = JSON.parse(localStorage.getItem('inventarioHerramientas')) || [];
    setToolsList(savedTools);
    const savedMilestones = JSON.parse(localStorage.getItem('inventarioHitos')) || [];
    setMilestonesList(savedMilestones);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-12 flex flex-col items-center overflow-x-hidden">
      
      <div className="w-full max-w-4xl flex flex-col">
        
        {/* ==========================================
            ENCABEZADO: Perfil y Destacado Animado
        =========================================== */}
        <header className="flex justify-between items-start w-full mb-12">
          
          {/* Lado Izquierdo: Info Básica */}
          <div className="z-10 mt-2">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-indigo-400 leading-tight mb-4">
              Miguel Arango Gómez
            </h1>
            <ul className="space-y-2 text-sm md:text-base text-zinc-300 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-zinc-400"></span> 
                Medellín - Colombia
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-zinc-400"></span> 
                Pregrado: Ided
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-zinc-400"></span> 
                Curso modelado 3D
              </li>
            </ul>
          </div>
          
          {/* Lado Derecho: Estrella Expandible Acoplada */}
          <div className={`flex items-center rounded-3xl transition-all duration-500 ease-in-out overflow-hidden ${
            starExpanded 
              ? 'bg-zinc-900/90 border border-zinc-800 p-5 shadow-2xl backdrop-blur-sm' 
              : 'p-2 border border-transparent'
          }`}>
            
            {/* Botón de la Estrella */}
            <button 
              onClick={() => setStarExpanded(!starExpanded)}
              className={`relative flex items-center justify-center shrink-0 transition-all duration-500 ease-out z-20 ${
                starExpanded 
                  // Estrella expandida (más grande para que quepa el texto)
                  ? 'w-24 h-24 md:w-28 md:h-28 text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] mr-4' 
                  // Estrella normal
                  : 'w-10 h-10 md:w-12 md:h-12 text-zinc-400 hover:text-yellow-500'
              }`}
            >
              {/* El SVG ahora ocupa el 100% de su contenedor (w-full h-full) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-colors duration-500" viewBox="0 0 24 24" fill={starExpanded ? "currentColor" : "none"} stroke="currentColor" strokeWidth={starExpanded ? "1" : "2"} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              
              {/* Texto "BACHILLER" - Centrado y ajustado para no salirse */}
              <span className={`absolute font-black uppercase tracking-tight transition-all duration-500 pointer-events-none ${
                starExpanded 
                  ? 'opacity-100 text-zinc-950 text-xs md:text-sm mt-3 scale-100' 
                  : 'opacity-0 text-[0px] scale-50'
              }`}>
                Bachiller
              </span>
            </button>

            {/* Información Revelada (Alineada y espaciada correctamente) */}
            <div 
              className={`flex flex-col justify-center transition-all duration-500 ease-in-out ${
                starExpanded 
                  ? 'max-w-[400px] opacity-100 translate-x-0' 
                  : 'max-w-0 opacity-0 translate-x-8'
              }`}
            >
              {/* min-w-max asegura que el texto no se aplaste en varias líneas mientras se anima */}
              <div className="whitespace-nowrap min-w-max pr-4">
                <h3 className="text-xl md:text-2xl font-bold font-serif text-zinc-100 leading-none">
                  Instituto Jorge Robledo
                </h3>
                <p className="text-[10px] md:text-xs text-zinc-400 mb-4 mt-1.5 uppercase tracking-widest font-semibold">
                  Institución educativa
                </p>
                
                <h3 className="text-xl md:text-2xl font-bold font-serif text-zinc-100 leading-none">
                  Modelado 3D
                </h3>
                <p className="text-[10px] md:text-xs text-zinc-400 mt-1.5 uppercase tracking-widest font-semibold">
                  Educación media
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* ==========================================
            SECCIÓN CENTRAL: Agregar y Rasgos
        =========================================== */}
        <section className="flex flex-col items-center mb-12 w-full">
          <button 
            onClick={() => navigate('/herramientas')}
            className="w-32 aspect-[2/3] bg-zinc-900 border-2 border-zinc-700 hover:border-indigo-500 rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-indigo-400 transition-all hover:scale-105 active:scale-95 shadow-lg mb-8"
          >
            <span className="text-6xl font-light mb-2">+</span>
            <span className="text-xs font-bold uppercase tracking-widest">Agregar</span>
          </button>

          <div className="w-full max-w-sm flex flex-col items-center">
            <h2 className="text-lg font-bold font-serif text-zinc-100 mb-3">Rasgos</h2>
            <button className="w-full py-2 bg-zinc-900 border border-zinc-700 hover:border-indigo-500 hover:text-indigo-400 rounded-lg text-lg font-bold transition-colors shadow-md">
              (+)
            </button>
          </div>
        </section>

        {/* ==========================================
            INVENTARIO: Herramientas e Hitos
        =========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Recuadro de Herramientas (Con Lista Dinámica) */}
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col h-[250px]">
            
            {/* Cabecera con botón de + integrado */}
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2 shrink-0">
              <h3 className="text-xl font-bold font-serif text-zinc-100">
                Herramientas
              </h3>
              <button 
                onClick={() => navigate('/herramientas')}
                className="text-2xl font-light text-zinc-400 hover:text-indigo-400 transition-colors px-2"
                title="Forjar nueva"
              >
                +
              </button>
            </div>

            {/* Lista de elementos (Con scroll si hay muchas) */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
              {toolsList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <span className="text-zinc-400 text-sm italic">Sin herramientas</span>
                </div>
              ) : (
                toolsList.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => navigate('/herramientas', { state: { toolId: t.id } })}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex justify-between items-center text-left group hover:border-emerald-500/50 transition-colors cursor-pointer"
                    aria-label={`Editar herramienta ${t.name}`}
                  >
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-emerald-400 text-sm truncate">
                        {t.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                        {t.discipline}
                      </span>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-center shrink-0 ml-2">
                      <span className="text-[10px] text-zinc-500 block leading-none">Nvl</span>
                      <span className="text-sm font-bold text-zinc-200 leading-none">{t.mastery}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
            
          </div>

          {/* Recuadro de Hitos con lista dinámica */}
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col h-[250px]">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2 shrink-0">
              <h3 className="text-xl font-bold font-serif text-zinc-100">
                Hitos
              </h3>
              <button
                type="button"
                onClick={() => navigate('/hitos')}
                className="text-2xl font-light text-zinc-400 hover:text-indigo-400 transition-colors px-2"
                title="Registrar nuevo hito"
                aria-label="Registrar nuevo hito"
              >
                +
              </button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
              {milestonesList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <span className="text-zinc-400 text-sm italic">Sin hitos</span>
                </div>
              ) : (
                milestonesList.map((milestone) => (
                  <button
                    key={milestone.id}
                    type="button"
                    onClick={() => navigate('/hitos', { state: { milestoneId: milestone.id } })}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex flex-col gap-1 text-left hover:border-indigo-500/50 transition-colors cursor-pointer"
                    aria-label={`Editar hito ${milestone.name}`}
                  >
                    <span className="font-bold text-indigo-400 text-sm truncate">
                      {milestone.name}
                    </span>
                    <span className="text-xs text-zinc-400 line-clamp-2">
                      {milestone.description}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}