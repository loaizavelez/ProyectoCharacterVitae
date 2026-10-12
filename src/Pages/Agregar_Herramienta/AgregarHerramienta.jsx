import Herramienta from '../../Components/Herramienta/Herramienta.jsx';

export default function AgregarHerramienta() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Cabecera de la página */}
        <header className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400 group-hover:text-zinc-100 transition-colors"
              aria-label="Regresar"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-wide text-zinc-100">
              Mesa de Forja
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Registra un nuevo artefacto en tu arsenal.
            </p>
          </div>
        </header>

        {/* Renderizado del Componente */}
        <section>
          <Herramienta />
        </section>
        
      </div>
    </main>
  );
}