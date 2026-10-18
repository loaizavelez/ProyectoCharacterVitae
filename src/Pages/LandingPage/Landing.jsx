import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  const [previewData, setPreviewData] = useState({
    profileName: 'Viajero Misterioso',
    profileLocation: 'Tierras desconocidas',
    profileRank: 'Sin rango',
    profileInstitution: 'Gremio independiente',
    toolName: 'React.js',
    toolDiscipline: 'Desarrollo Frontend',
    milestoneTitle: 'Primer Proyecto',
    milestoneDesc: 'Completó su primera gran aventura en el código.'
  });

  useEffect(() => {
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    
    if (usuariosDB.length > 0) {
      const user = usuariosDB[usuariosDB.length - 1]; 
      const userTool = user.inventory?.tools?.[0];
      const userMilestone = user.inventory?.milestones?.[0];

      setPreviewData({
        profileName: user.profile.name,
        profileLocation: user.profile.location,
        profileRank: user.profile.educationLevel || 'N/A',
        profileInstitution: user.profile.institution || 'Independiente',
        toolName: userTool ? userTool.name : 'Motor Unity 3D',
        toolDiscipline: userTool ? userTool.discipline : 'Desarrollo de Videojuegos',
        milestoneTitle: userMilestone ? userMilestone.name : 'Character Vitae',
        milestoneDesc: userMilestone ? userMilestone.description : 'Creación de un portafolio interactivo.'
      });
    }
  }, []);

  return (
    <main className="w-full max-w-full min-h-screen bg-[#0d0d0f] text-zinc-100 font-sans flex flex-col overflow-x-hidden relative">
      
      {/* ==========================================
          ENCABEZADO (Navegación)
      =========================================== */}
      <header className="flex justify-between items-center w-full px-6 py-6 md:px-12 border-b border-zinc-800/50 sticky top-0 bg-[#0d0d0f]/90 backdrop-blur-md z-50">
        <h1 className="text-2xl md:text-3xl font-black font-serif text-[#7a73ff]">
          Character Vitae
        </h1>
        <button 
          onClick={() => navigate('/login')}
          className="px-5 py-2 border-2 border-zinc-300 text-zinc-300 font-bold rounded-lg text-sm hover:bg-zinc-800 transition-colors shadow-[2px_2px_0px_rgba(212,212,216,1)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]"
        >
          sign in
        </button>
      </header>

      {/* ==========================================
          CONTENIDO PRINCIPAL (Flujo Vertical)
      =========================================== */}
      <div className="max-w-5xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col gap-24">
        
        {/* BLOQUE 1: Sube tus proyectos */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          
          {/* Textos Izquierda */}
          <div className="w-full md:w-5/12 flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-zinc-100 leading-tight">
              Sube tus proyectos.
            </h2>
            <p className="text-lg md:text-xl font-medium text-zinc-300 leading-relaxed max-w-md mx-auto md:mx-0">
              Comparte los proyectos de los que te sientas orgulloso.
            </p>
          </div>
          
          {/* Tarjeta Derecha */}
          <div className="w-full md:w-6/12">
            <h3 className="text-sm font-bold text-zinc-400 mb-2 ml-1">Perfil destacado</h3>
            <div className="bg-[#18181b] border-2 border-zinc-700 rounded-2xl p-6 shadow-lg relative min-h-[180px] flex flex-col justify-between transform hover:-translate-y-1 transition-transform group overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 bg-[#09090b] rounded-full flex items-center justify-center border-2 border-zinc-600 text-zinc-500 group-hover:border-[#7a73ff] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="flex flex-col mt-1 w-full overflow-hidden">
                  <p className="text-2xl font-bold font-serif text-[#7a73ff] capitalize leading-none truncate">{previewData.profileName}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-zinc-400 text-sm font-medium truncate">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {previewData.profileLocation}
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-zinc-800/80 my-5"></div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center w-full">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">Rango Actual</span>
                  <span className="text-sm font-medium text-zinc-200 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700/50 inline-block w-fit">
                    {previewData.profileRank}
                  </span>
                </div>
                <div className="flex flex-col sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">Institución / Gremio</span>
                  <span className="text-sm font-bold text-zinc-300 capitalize truncate">{previewData.profileInstitution}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 2: Comparte tus logros (Zigzag) */}
        <section className="flex flex-col gap-12 md:gap-16 w-full">
          
          <div className="w-full text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-zinc-100 mb-2">
              Comparte tus logros.
            </h2>
          </div>
          
          {/* Fila A: Tarjeta Herramientas Izq, Texto Der */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-6/12 bg-[#18181b] border border-zinc-800 rounded-2xl p-6 shadow-md hover:border-emerald-500/50 transition-colors">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Herramientas</h3>
              <div className="bg-[#09090b] border border-zinc-700 p-4 rounded-xl">
                <p className="text-lg font-bold text-emerald-400">{previewData.toolName}</p>
                <p className="text-sm text-zinc-400 mt-1">{previewData.toolDiscipline}</p>
              </div>
            </div>
            <div className="w-full md:w-5/12 text-center md:text-left">
              <p className="text-lg md:text-xl font-medium text-zinc-300 leading-relaxed max-w-sm mx-auto md:mx-0">
                Dile al mundo qué herramientas usaste para desarrollar tu idea.
              </p>
            </div>
          </div>

          {/* Fila B: Texto Izq, Tarjeta Hitos Der */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-5/12 text-center md:text-left">
              <p className="text-lg md:text-xl font-medium text-zinc-300 leading-relaxed max-w-sm mx-auto md:mx-0">
                Muestra los logros de los que rompieron esquemas.
              </p>
            </div>
            <div className="w-full md:w-6/12 bg-[#18181b] border border-zinc-800 rounded-2xl p-6 shadow-md hover:border-indigo-500/50 transition-colors">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Hitos</h3>
              <div className="bg-[#09090b] border border-zinc-700 p-4 rounded-xl">
                <p className="text-lg font-bold text-indigo-400">{previewData.milestoneTitle}</p>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{previewData.milestoneDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 3: Se tu personaje (Llamado a la acción) */}
        <section className="flex flex-col items-center text-center gap-6 mt-10 mb-20 bg-[#18181b]/50 border border-zinc-800/50 p-10 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#7a73ff]">
            Sé tu personaje.
          </h2>
          <p className="text-lg font-medium text-zinc-300 leading-relaxed max-w-md">
            ¿Qué esperas? Entra ya y regístrate para que tu aventura esté llena de tesoros.
          </p>
          <button 
            onClick={() => navigate('/registro')}
            className="mt-4 px-10 py-4 bg-zinc-100 hover:bg-zinc-300 border-2 border-zinc-950 text-zinc-950 font-bold font-serif text-xl rounded-xl transition-transform active:scale-95 shadow-lg"
          >
            Crea tu cuenta
          </button>
        </section>

      </div>
    </main>
  );
}