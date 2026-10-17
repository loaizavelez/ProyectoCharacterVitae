import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 lg:p-12 flex flex-col relative">
      
      {/* Botón de retroceso en la esquina superior izquierda[cite: 11, 12] */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-10 md:left-10 p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition-colors group z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
      </button>

      {/* Contenedor centralizado para el formulario. 
          Al usar flex-1 y justify-center, el formulario se mantiene perfectamente 
          centrado tanto en la vista vertical del móvil[cite: 12] 
          como en la vista horizontal de la tableta[cite: 11]. */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-sm md:max-w-md flex flex-col gap-6 bg-zinc-900/50 md:bg-zinc-900 border border-transparent md:border-zinc-800 p-6 md:p-10 rounded-2xl md:shadow-2xl">
          
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-indigo-400 text-center mb-4 tracking-wide">
            Crea tu cuenta
          </h1>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Campo: Correo[cite: 11, 12] */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">
                Ingresa un correo
              </label>
              <input 
                type="email" 
                required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white transition-all"
              />
            </div>

            {/* Campo: Contraseña[cite: 11, 12] */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">
                Ingresa una contraseña
              </label>
              <input 
                type="password" 
                required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white transition-all"
              />
            </div>

            {/* Campo: Confirmar Contraseña[cite: 11, 12] */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">
                Confirma tu contraseña
              </label>
              <input 
                type="password" 
                required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-white transition-all"
              />
            </div>

            {/* Botones de acción[cite: 11, 12] */}
            <div className="flex justify-center gap-4 mt-6">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium rounded-xl transition-colors"
              >
                Volver
              </button>
              <button 
                type="submit"
                onClick={() => navigate('/recuperacion')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Siguiente
              </button>
            </div>

          </form>
        </div>
      </div>

    </main>
  );
}