import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  // Referencias para el desplazamiento por diapositivas
  const slide1 = useRef(null);
  const slide2 = useRef(null);
  const slide3 = useRef(null);

  const [previewData, setPreviewData] = useState({
    profileName: 'Viajero Misterioso',
    profileLocation: 'Tierras desconocidas',
    profileRank: 'Sin rango',
    profileInstitution: 'Gremio independiente',
    toolName: 'Pergamino y Pluma',
    toolDiscipline: 'Cartografía',
    milestoneTitle: 'Primera Aventura',
    milestoneDesc: 'Completó su primer gran encargo en el tablón del gremio.'
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
        toolName: userTool ? userTool.name : 'Espada Corta',
        toolDiscipline: userTool ? userTool.discipline : 'Combate Básico',
        milestoneTitle: userMilestone ? userMilestone.name : 'Character Vitae',
        milestoneDesc: userMilestone ? userMilestone.description : 'El comienzo de una leyenda.'
      });
    }
  }, []);

  const scrollToSlide = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // CONTENEDOR PRINCIPAL: Aquí ocurre la magia del scroll-snap en PC
    <main className="w-full bg-[#f4ecd8] text-[#2c241b] font-serif relative lg:h-screen lg:overflow-y-auto lg:snap-y lg:snap-mandatory overflow-x-hidden scroll-smooth">
      
      {/* ==========================================
          ENCABEZADO (Fijo superior)
      =========================================== */}
      <header className="fixed top-0 left-0 flex justify-between items-center w-full px-4 py-4 md:px-12 md:py-5 border-b-2 border-[#d0c2a8] bg-[#f4ecd8]/95 backdrop-blur-md z-50 shadow-sm gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm shrink-0"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/><line x1="12" y1="2" x2="12" y2="15.5"/><line x1="22" y1="15.5" x2="12" y2="15.5"/><line x1="2" y1="15.5" x2="12" y2="15.5"/></svg>
          <h1 className="text-sm sm:text-lg md:text-2xl font-black font-epic tracking-widest text-[#2c241b] mt-1 leading-none">
            CHARACTER VITAE
          </h1>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="whitespace-nowrap shrink-0 px-3 py-2 md:px-5 md:py-2 bg-[#fdfaf3] border-2 border-[#c4a46c] hover:bg-[#f4ecd8] text-[#2c241b] font-bold rounded-lg transition-all active:scale-95 shadow-[0_3px_0_#c4a46c] active:shadow-none active:translate-y-[3px] tracking-wide text-xs sm:text-sm md:text-base"
        >
          Iniciar sesión
        </button>
      </header>

      {/* ==========================================
          NAVEGACIÓN LATERAL (Solo Escritorio)
      =========================================== */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
        <button onClick={() => scrollToSlide(slide1)} className="w-3 h-3 rounded-full bg-[#d0c2a8] border border-[#8c7b61] hover:bg-[#8b2e2e] transition-colors" aria-label="Ir a diapositiva 1"></button>
        <button onClick={() => scrollToSlide(slide2)} className="w-3 h-3 rounded-full bg-[#d0c2a8] border border-[#8c7b61] hover:bg-[#8b2e2e] transition-colors" aria-label="Ir a diapositiva 2"></button>
        <button onClick={() => scrollToSlide(slide3)} className="w-3 h-3 rounded-full bg-[#d0c2a8] border border-[#8c7b61] hover:bg-[#8b2e2e] transition-colors" aria-label="Ir a diapositiva 3"></button>
      </div>
        
      {/* ==========================================
          DIAPOSITIVA 1: Sube tus proyectos
          NOTA: Ahora es hija directa del <main>
      =========================================== */}
      <section ref={slide1} className="w-full min-h-screen lg:h-screen lg:snap-start lg:snap-always flex flex-col justify-center px-6 md:px-12 pt-24 lg:pt-0">
        <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-5/12 flex flex-col gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <hr className="w-8 border-[#8b2e2e] border-t-2" />
              <span className="text-[#8b2e2e] text-xs font-bold tracking-wider uppercase">Tus crónicas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-epic text-[#2c241b] leading-tight uppercase tracking-wide">
              Sube tus proyectos
            </h2>
            <p className="text-lg md:text-xl font-medium text-[#4a3f35] leading-relaxed max-w-md mx-auto md:mx-0">
              Comparte las gestas y aventuras de las que te sientas más orgulloso ante todo el reino.
            </p>
          </div>
          <div className="w-full md:w-6/12">
            <h3 className="text-xs font-bold text-[#8c7b61] mb-2 ml-1 uppercase tracking-widest">Perfil destacado</h3>
            <div className="bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-2xl p-6 shadow-lg relative min-h-[180px] flex flex-col justify-between transform hover:-translate-y-1 transition-transform group overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 bg-[#f4ecd8] rounded-full flex items-center justify-center border-2 border-[#8c7b61] text-[#8c7b61] group-hover:border-[#8b2e2e] group-hover:text-[#8b2e2e] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="flex flex-col mt-1 w-full overflow-hidden">
                  <p className="text-2xl font-black font-epic text-[#8b2e2e] uppercase leading-none truncate tracking-wide">{previewData.profileName}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[#4a3f35] text-sm font-bold truncate">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {previewData.profileLocation}
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-[#d0c2a8] my-5"></div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center w-full">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-[#8c7b61] font-bold mb-0.5">Rango Actual</span>
                  <span className="text-sm font-bold text-[#2c241b] bg-[#f4ecd8] px-2 py-0.5 rounded border border-[#c4a46c] inline-block w-fit">
                    {previewData.profileRank}
                  </span>
                </div>
                <div className="flex flex-col sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-[#8c7b61] font-bold mb-0.5">Gremio / Institución</span>
                  <span className="text-sm font-black text-[#2c241b] uppercase truncate">{previewData.profileInstitution}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor Épico (Visible solo en móvil) se coloca dentro de la primera sección */}
        <div className="flex lg:hidden items-center justify-center gap-4 w-full opacity-60 max-w-md mx-auto mt-16">
          <hr className="flex-1 border-[#c4a46c] border-t-2" />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b2e2e" strokeWidth="2"><polygon points="12 2 22 12 12 22 2 12"/></svg>
          <hr className="flex-1 border-[#c4a46c] border-t-2" />
        </div>
      </section>

      {/* ==========================================
          DIAPOSITIVA 2: Comparte tus logros
      =========================================== */}
      <section ref={slide2} className="w-full min-h-screen lg:h-screen lg:snap-start lg:snap-always flex flex-col justify-center px-6 md:px-12 py-16 lg:py-0">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-12">
          <div className="w-full text-center">
            <h2 className="text-3xl md:text-5xl font-black font-epic text-[#2c241b] mb-2 uppercase tracking-wide">
              Comparte tus logros
            </h2>
          </div>
          
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-6/12 bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-2xl p-6 shadow-md hover:border-[#8b2e2e] transition-colors group">
              <h3 className="text-xs font-bold text-[#8c7b61] uppercase tracking-widest mb-4">Artefactos Equipados</h3>
              <div className="bg-[#f4ecd8] border border-[#c4a46c] p-4 rounded-xl">
                <p className="text-lg font-black text-[#2c241b] tracking-wide">{previewData.toolName}</p>
                <p className="text-sm font-bold text-[#8b2e2e] mt-1 uppercase tracking-wider">{previewData.toolDiscipline}</p>
              </div>
            </div>
            <div className="w-full md:w-5/12 text-center md:text-left">
              <p className="text-lg md:text-xl font-medium text-[#4a3f35] leading-relaxed max-w-sm mx-auto md:mx-0">
                Deja registro de los artefactos, herramientas y hechizos que utilizaste para materializar tus ideas.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-5/12 text-center md:text-left">
              <p className="text-lg md:text-xl font-medium text-[#4a3f35] leading-relaxed max-w-sm mx-auto md:mx-0">
                Inmortaliza los hitos y proezas que forjaron tu camino hasta convertirte en leyenda.
              </p>
            </div>
            <div className="w-full md:w-6/12 bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-2xl p-6 shadow-md hover:border-[#8b2e2e] transition-colors">
              <h3 className="text-xs font-bold text-[#8c7b61] uppercase tracking-widest mb-4">Hitos y Misiones</h3>
              <div className="bg-[#f4ecd8] border border-[#c4a46c] p-4 rounded-xl">
                <p className="text-lg font-black text-[#2c241b] tracking-wide">{previewData.milestoneTitle}</p>
                <p className="text-sm font-medium text-[#4a3f35] mt-2 line-clamp-2">{previewData.milestoneDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          DIAPOSITIVA 3: Crea tu leyenda
      =========================================== */}
      <section ref={slide3} className="w-full min-h-screen lg:h-screen lg:snap-start lg:snap-always flex flex-col justify-center px-6 md:px-12 py-16 lg:py-0">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-6 bg-[#fdfaf3] border-2 border-[#c4a46c] p-10 md:p-16 rounded-3xl shadow-lg relative overflow-hidden">
          
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -top-4 -left-4 opacity-30"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -bottom-4 -right-4 opacity-30 rotate-180"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>

          <h2 className="text-4xl md:text-5xl font-black font-epic text-[#8b2e2e] uppercase tracking-widest relative z-10">
            Crea tu leyenda
          </h2>
          <p className="text-lg font-medium text-[#4a3f35] leading-relaxed max-w-md relative z-10">
            ¿Qué esperas aventurero? Entra ya y regístrate para que tu hoja de personaje esté llena de tesoros.
          </p>
          
          <button 
            onClick={() => navigate('/registro')}
            className="mt-6 px-12 py-4 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold rounded-xl transition-all active:scale-95 shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-[4px] text-xl tracking-wide relative z-10 flex items-center gap-3 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:text-[#d4af37] transition-colors"><line x1="14.5" y1="17.5" x2="3" y2="6"/><polygon points="21 3 18 3 14 7 17 10 21 6 21 3"/><line x1="3" y1="21" x2="8.5" y2="15.5"/><line x1="17" y1="10" x2="21" y2="14"/><line x1="10" y1="17" x2="14" y2="21"/></svg>
            Comenzar Aventura
          </button>
        </div>
      </section>

    </main>
  );
}