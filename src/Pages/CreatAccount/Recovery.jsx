import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif px-6 py-10 flex flex-col relative items-center justify-center">
      
      {/* Botón de retroceso (Esquina superior) */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:top-10 md:left-10 text-[#2c241b] hover:text-[#8b2e2e] transition-colors z-10 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </button>

      {/* Contenedor centralizado (El Pergamino) */}
      <div className="w-full max-w-sm md:max-w-md flex flex-col gap-6 bg-[#fdfaf3]/50 md:bg-transparent border border-transparent p-6 md:p-10 rounded-2xl relative">
        
        {/* Decoración superior (opcional para dar toque épico) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1"><polygon points="12 2 22 12 12 22 2 12"/></svg>
        </div>

        {/* Título de Sección */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <hr className="w-8 border-[#8b2e2e] border-t-2" />
          <span className="text-[#8b2e2e] text-xs font-bold tracking-wider uppercase text-center">Restaurar conjuro</span>
          <hr className="w-8 border-[#8b2e2e] border-t-2" />
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-epic font-black text-[#2c241b] text-center tracking-wider mb-2">
          MÉTODOS DE RECUPERACIÓN
        </h1>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Campo: Correo de recuperación */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#4a3f35] ml-1">
              Correo recuperación
            </label>
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b2e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 opacity-80"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input 
                type="email" 
                placeholder="correo@gremio.com"
                className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl pl-12 pr-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* Campo: Teléfono */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-[#4a3f35] ml-1">
              Ingresa un teléfono
            </label>
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              <input 
                type="tel" 
                placeholder="+57 300 123 4567"
                className="w-full bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl pl-12 pr-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-sm font-mono"
              />
            </div>
          </div>

          {/* Enlace: Otro método */}
          <div className="flex justify-end mt-[-8px]">
            <button 
              type="button" 
              className="text-sm font-bold text-[#8b2e2e] hover:text-[#6b2323] underline decoration-1 underline-offset-4 transition-colors"
            >
              Probar otra vía
            </button>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center gap-4 mt-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-4 bg-[#fdfaf3] border-2 border-[#c4a46c] hover:bg-[#f4ecd8] text-[#2c241b] font-bold rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#c4a46c] active:shadow-none active:translate-y-[4px]"
            >
              Atrás
            </button>
            <button 
              type="submit"
              onClick={() => navigate('/sheet')}
              className="flex-1 py-4 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-[4px] tracking-wide text-lg"
            >
              Siguiente
            </button>
          </div>

        </form>
      </div>

      {/* Adorno de esquina inferior (opcional) */}
      <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
      </div>

    </main>
  );
}