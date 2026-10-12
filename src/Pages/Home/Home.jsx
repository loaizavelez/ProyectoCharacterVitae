import { useState } from 'react';

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-6 lg:p-8">
      {/* Contenedor principal con Grid. 
          1 columna en móvil, 12 columnas lógicas en tablet/escritorio */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ==========================================
            COLUMNA 1: PERFIL (Izquierda)
            Móvil: Ocupa todo | Tablet: 5/12 | Escritorio: 3/12
        =========================================== */}
        <section className="col-span-1 md:col-span-5 lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative shadow-lg h-max">
          <button className="absolute top-6 right-6 text-zinc-500 hover:text-yellow-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>

          <div className="mb-6 pr-8">
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-indigo-400 leading-tight">
              MIGUEL ARANGO GÓMEZ
            </h1>
          </div>

          <ul className="space-y-3 text-sm text-zinc-300 font-medium">
            <li className="flex items-center gap-3"><span className="text-lg">📍</span> Medellín, Colombia</li>
            <li className="flex items-center gap-3"><span className="text-lg">🎓</span> Bachiller - Inst. Jorge Robledo</li>
            <li className="flex items-center gap-3"><span className="text-lg">🧊</span> Curso modelado 3D</li>
          </ul>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h2 className="text-lg font-bold text-zinc-100 mb-3">Rasgos</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-zinc-950 border border-zinc-700 rounded-full text-xs font-semibold text-zinc-300">🧠 Autodidacta</span>
              <span className="px-3 py-1 bg-zinc-950 border border-zinc-700 rounded-full text-xs font-semibold text-zinc-300">🦉 Noctámbulo</span>
            </div>
            <button className="w-full py-2 bg-zinc-950 border border-dashed border-zinc-700 hover:border-indigo-500 hover:text-indigo-400 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              <span>(+)</span> Añadir Trait
            </button>
          </div>
        </section>

        {/* ==========================================
            COLUMNA 2: ACCIÓN CENTRAL (Medio)
            Móvil: Ocupa todo | Tablet: 7/12 | Escritorio: 4/12
        =========================================== */}
        <section className="col-span-1 md:col-span-7 lg:col-span-4 flex flex-col gap-6">
          {/* Pequeños stats estilo RPG (Visibles más que todo en tablet/desktop) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center shadow-md">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Nivel</p>
              <p className="text-3xl font-serif text-zinc-200">5</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center shadow-md">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Clase</p>
              <p className="text-lg font-serif text-indigo-400 mt-1">Desarrollador</p>
            </div>
          </div>

          {/* Tarjeta Gigante de Agregar */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 w-full min-h-[200px] md:min-h-[300px] bg-zinc-900 border-2 border-dashed border-zinc-700 hover:border-indigo-500 rounded-2xl flex flex-col items-center justify-center gap-4 text-zinc-500 hover:text-indigo-400 transition-all hover:scale-[1.02] active:scale-95 group shadow-lg"
          >
            <span className="text-6xl font-light group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">+</span>
            <span className="text-sm font-bold uppercase tracking-widest">Forjar / Invocar</span>
          </button>
        </section>

        {/* ==========================================
            COLUMNA 3: HISTORIAL E INVENTARIO (Derecha)
            Móvil: Ocupa todo | Tablet: 12/12 (abajo) | Escritorio: 5/12
        =========================================== */}
        <section className="col-span-1 md:col-span-12 lg:col-span-5 flex flex-col gap-6">
          {/* En tableta se ponen lado a lado, en móvil y escritorio se apilan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 h-full">
            
            {/* Herramientas */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col min-h-[250px]">
              <h3 className="text-xl font-bold font-serif text-zinc-100 mb-4 border-b border-zinc-800 pb-2">
                Arsenal (Herramientas)
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-zinc-600 text-sm italic text-center">
                  Aún no has forjado ninguna herramienta.
                </p>
              </div>
            </div>

            {/* Hitos */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg flex flex-col min-h-[250px]">
              <h3 className="text-xl font-bold font-serif text-zinc-100 mb-4 border-b border-zinc-800 pb-2">
                Diario (Hitos)
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-zinc-600 text-sm italic text-center">
                  Tu diario está en blanco. Registra tu primera hazaña.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Modal Oscuro Simulado */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-white mb-4">¿Qué deseas invocar?</h3>
            <div className="flex flex-col gap-3">
              <button className="py-3 bg-zinc-950 hover:bg-indigo-600 border border-zinc-800 rounded-lg text-white font-semibold transition-colors">
                ⚔️ Forjar Herramienta
              </button>
              <button className="py-3 bg-zinc-950 hover:bg-indigo-600 border border-zinc-800 rounded-lg text-white font-semibold transition-colors">
                📜 Registrar Hito
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="mt-4 text-sm text-zinc-500 hover:text-zinc-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}