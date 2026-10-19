import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  const [starExpanded, setStarExpanded] = useState(false);
  const [toolsList, setToolsList] = useState([]);
  const [milestonesList, setMilestonesList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillDraft, setSkillDraft] = useState({ name: '', attributes: [] });
  const [newAttr, setNewAttr] = useState({ name: '', value: '' });

  const [activeProfile, setActiveProfile] = useState({
    name: 'Viajero Desconocido',
    location: 'Sin ubicación',
    educationLevel: 'Sin rango',
    institution: 'Gremio independiente'
  });

  // ==========================================
  // CARGAR DATOS DIRECTO DEL USUARIO
  // ==========================================
  useEffect(() => {
    cargarDatosPantalla();
  }, [navigate]);

  const cargarDatosPantalla = () => {
    const activeId = localStorage.getItem('usuarioActivo');
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const currentUser = usuariosDB.find(u => u.id === activeId);

    if (currentUser) {
      setActiveProfile(currentUser.profile);
      setToolsList(currentUser.inventory.tools || []);
      setMilestonesList(currentUser.inventory.milestones || []);
      setSkillsList(currentUser.inventory.skills || []);
    } else {
      navigate('/login');
    }
  };

  // ==========================================
  // LÓGICA DE PARTIDA (JSON)
  // ==========================================
  const exportarPersonaje = () => {
    const activeId = localStorage.getItem('usuarioActivo');
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const currentUser = usuariosDB.find(u => u.id === activeId);

    if (!currentUser) return;

    const blob = new Blob([JSON.stringify(currentUser, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `partida_${currentUser.profile.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importarPersonaje = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const personajeImportado = JSON.parse(e.target.result);
        
        const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
        const index = usuariosDB.findIndex(u => u.id === personajeImportado.id);
        
        if (index >= 0) {
          usuariosDB[index] = personajeImportado;
        } else {
          usuariosDB.push(personajeImportado);
        }
        
        localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));
        localStorage.setItem('usuarioActivo', personajeImportado.id);

        cargarDatosPantalla();
        alert('Crónicas restauradas con éxito.');
        
      } catch (error) {
        alert("El pergamino (archivo JSON) está corrupto.");
      }
    };
    reader.readAsText(file);
    event.target.value = null; 
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    navigate('/login');
  };

  // ==========================================
  // LÓGICA DE HABILIDADES
  // ==========================================
  const handleAddAttribute = () => {
    if (!newAttr.name || !newAttr.value) return;
    setSkillDraft(prev => ({
      ...prev,
      attributes: [...prev.attributes, { ...newAttr }]
    }));
    setNewAttr({ name: '', value: '' }); 
  };

  const handleRemoveAttribute = (indexToRemove) => {
    setSkillDraft(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSaveSkill = () => {
    if (!skillDraft.name) return; 
    
    let finalAttributes = [...skillDraft.attributes];
    if (newAttr.name && newAttr.value) {
      finalAttributes.push({ ...newAttr });
    }

    const newSkill = { ...skillDraft, attributes: finalAttributes, id: Date.now() };
    const updatedSkills = [...skillsList, newSkill];
    
    setSkillsList(updatedSkills);
    
    const activeId = localStorage.getItem('usuarioActivo');
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const userIndex = usuariosDB.findIndex(u => u.id === activeId);
    
    if (userIndex !== -1) {
      usuariosDB[userIndex].inventory.skills = updatedSkills;
      localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));
    }
    
    setShowSkillModal(false);
    setSkillDraft({ name: '', attributes: [] });
    setNewAttr({ name: '', value: '' });
  };

  const handleCloseModal = () => {
    setShowSkillModal(false);
    setSkillDraft({ name: '', attributes: [] });
    setNewAttr({ name: '', value: '' });
  };

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif p-6 md:p-12 flex flex-col items-center overflow-x-hidden relative">
      
      {/* PANEL DE CONTROL SUPERIOR */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-30">
        <button onClick={exportarPersonaje} className="text-xs font-bold text-[#8c7b61] hover:text-[#8b2e2e] uppercase tracking-widest transition-colors flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Guardar
        </button>
        <label className="text-xs font-bold text-[#8c7b61] hover:text-[#c4a46c] uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          Cargar
          <input type="file" accept=".json" onChange={importarPersonaje} className="hidden" />
        </label>
        <span className="text-[#d0c2a8]">|</span>
        <button onClick={handleLogout} className="text-xs font-bold text-[#8c7b61] hover:text-[#8b2e2e] uppercase tracking-widest transition-colors">
          Cerrar Sesión
        </button>
      </div>

      <div className="w-full max-w-4xl flex flex-col mt-8">
        
        {/* ==========================================
            ENCABEZADO: Perfil Dinámico
        =========================================== */}
        <header className="flex justify-between items-start w-full mb-12">
          <div className="z-10 mt-2">
            <h1 className="text-4xl md:text-5xl font-black font-epic text-[#2c241b] tracking-wider mb-4 uppercase">
              {activeProfile.name}
            </h1>
            <ul className="space-y-2 text-sm md:text-base text-[#4a3f35] font-bold capitalize">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rotate-45 bg-[#c4a46c] border border-[#8c7b61]"></span>{activeProfile.location}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rotate-45 bg-[#c4a46c] border border-[#8c7b61]"></span>Rango: {activeProfile.educationLevel}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rotate-45 bg-[#c4a46c] border border-[#8c7b61]"></span>{activeProfile.institution}</li>
            </ul>
          </div>
          
          {/* Insignia / Rango Expansible */}
          <div className={`flex items-center rounded-2xl transition-all duration-500 ease-in-out overflow-hidden ${starExpanded ? 'bg-[#fdfaf3]/90 border-2 border-[#c4a46c] p-5 shadow-[0_4px_0_#c4a46c] backdrop-blur-sm' : 'p-2 border border-transparent'}`}>
            <button onClick={() => setStarExpanded(!starExpanded)} className={`relative flex items-center justify-center shrink-0 transition-all duration-500 ease-out z-20 ${starExpanded ? 'w-24 h-24 md:w-28 md:h-28 text-[#d4af37] drop-shadow-sm mr-4' : 'w-10 h-10 md:w-12 md:h-12 text-[#8c7b61] hover:text-[#c4a46c]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-colors duration-500" viewBox="0 0 24 24" fill={starExpanded ? "currentColor" : "none"} stroke="currentColor" strokeWidth={starExpanded ? "1" : "2"} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span className={`absolute font-black uppercase tracking-tight transition-all duration-500 pointer-events-none text-center leading-none ${starExpanded ? 'opacity-100 text-[#2c241b] text-[10px] md:text-xs mt-3 scale-100' : 'opacity-0 text-[0px] scale-50'}`}>{activeProfile.educationLevel}</span>
            </button>
            <div className={`flex flex-col justify-center transition-all duration-500 ease-in-out ${starExpanded ? 'max-w-[400px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-8'}`}>
              <div className="whitespace-nowrap min-w-max pr-4">
                <h3 className="text-xl md:text-2xl font-black font-epic text-[#2c241b] leading-none uppercase">{activeProfile.institution}</h3>
                <p className="text-[10px] md:text-xs text-[#8b2e2e] mb-4 mt-1.5 uppercase tracking-widest font-bold">Base principal</p>
              </div>
            </div>
          </div>
        </header>

        {/* Divisor Épico */}
        <div className="flex items-center gap-4 w-full mb-8 opacity-60">
          <hr className="flex-1 border-[#c4a46c] border-t-2" />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b2e2e" strokeWidth="2"><polygon points="12 2 22 12 12 22 2 12"/></svg>
          <hr className="flex-1 border-[#c4a46c] border-t-2" />
        </div>

        {/* ==========================================
            SECCIÓN CENTRAL: Habilidades / Rasgos
        =========================================== */}
        <section className="mb-12 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold font-epic text-[#2c241b] mb-6 w-full text-left md:text-center tracking-widest border-b-2 border-transparent md:border-[#8b2e2e] inline-block pb-2">
            RASGOS Y HABILIDADES
          </h2>
          <div className="flex flex-row overflow-x-auto w-full gap-4 py-6 px-4 custom-scrollbar md:justify-center">
            {skillsList.map(skill => (
              <div key={skill.id} className="w-36 md:w-40 shrink-0 aspect-[2/3] bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl flex flex-col p-4 shadow-sm hover:border-[#8b2e2e] hover:-translate-y-1 transition-all">
                <div className="flex justify-center mb-auto mt-2 text-[#8c7b61]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </div>
                <h3 className="text-center font-bold text-[#2c241b] mb-4 truncate w-full uppercase text-sm tracking-wide">{skill.name}</h3>
                <div className="flex flex-col gap-1 text-[10px] md:text-xs font-bold text-[#4a3f35] w-full">
                  {skill.attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between w-full border-b border-[#d0c2a8]/50 pb-1">
                      <span className="truncate">{attr.name}</span>
                      <span className="text-[#8b2e2e]">+{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setShowSkillModal(true)} className="w-36 md:w-40 shrink-0 aspect-[2/3] bg-[#f4ecd8] border-2 border-dashed border-[#c4a46c] hover:border-[#8b2e2e] hover:bg-[#fdfaf3] rounded-xl flex flex-col items-center justify-center gap-2 text-[#8c7b61] hover:text-[#8b2e2e] transition-all hover:scale-[1.02] active:scale-95 shadow-sm">
              <span className="text-6xl font-light mb-2">+</span>
              <span className="text-xs font-bold uppercase tracking-widest">Aprender</span>
            </button>
          </div>
        </section>

        {/* ==========================================
            INVENTARIO: Herramientas e Hitos
        =========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Tarjeta Herramientas */}
          <div className="bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-2xl p-5 shadow-[0_4px_0_#c4a46c] flex flex-col h-[250px]">
            <div className="flex justify-between items-center mb-4 border-b-2 border-[#d0c2a8] pb-2 shrink-0">
              <h3 className="text-xl font-bold font-epic text-[#2c241b] tracking-wider uppercase">Herramientas</h3>
              <button onClick={() => navigate('/herramientas')} className="text-2xl font-light text-[#8c7b61] hover:text-[#8b2e2e] transition-colors px-2">+</button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
              {toolsList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70"><span className="text-[#8c7b61] text-sm italic font-medium">Bolsa vacía...</span></div>
              ) : (
                toolsList.map((t) => (
                  <button key={t.id} type="button" onClick={() => navigate('/herramientas', { state: { toolId: t.id } })} className="bg-[#f4ecd8] border border-[#c4a46c] rounded-xl p-3 flex justify-between items-center text-left group hover:border-[#8b2e2e] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer">
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-[#2c241b] text-sm truncate">{t.name}</span>
                      <span className="text-[10px] text-[#8b2e2e] uppercase tracking-widest font-bold mt-0.5">{t.discipline}</span>
                    </div>
                    <div className="bg-[#fdfaf3] border border-[#c4a46c] px-2 py-1 rounded text-center shrink-0 ml-2">
                      <span className="text-[10px] text-[#8c7b61] block leading-none font-bold uppercase">Nvl</span>
                      <span className="text-sm font-black text-[#8b2e2e] leading-none">{t.mastery}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Tarjeta Hitos */}
          <div className="bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-2xl p-5 shadow-[0_4px_0_#c4a46c] flex flex-col h-[250px]">
            <div className="flex justify-between items-center mb-4 border-b-2 border-[#d0c2a8] pb-2 shrink-0">
              <h3 className="text-xl font-bold font-epic text-[#2c241b] tracking-wider uppercase">Hitos & Proezas</h3>
              <button onClick={() => navigate('/hitos')} className="text-2xl font-light text-[#8c7b61] hover:text-[#8b2e2e] transition-colors px-2">+</button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
              {milestonesList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70"><span className="text-[#8c7b61] text-sm italic font-medium">Sin aventuras registradas...</span></div>
              ) : (
                milestonesList.map((milestone) => (
                  <button key={milestone.id} type="button" onClick={() => navigate('/hitos', { state: { milestoneId: milestone.id } })} className="bg-[#f4ecd8] border border-[#c4a46c] rounded-xl p-3 flex flex-col gap-1 text-left hover:border-[#8b2e2e] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer">
                    <span className="font-bold text-[#2c241b] text-sm truncate">{milestone.name}</span>
                    <span className="text-xs text-[#4a3f35] font-medium line-clamp-2">{milestone.description}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

      </div>

      {/* MODAL DE HABILIDADES */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-[#2c241b]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fdfaf3] border-4 border-[#c4a46c] rounded-2xl p-6 w-full max-w-sm flex flex-col gap-6 shadow-2xl relative">
            
            <h2 className="text-2xl font-black text-[#2c241b] font-epic tracking-wider text-center border-b-2 border-[#8b2e2e] pb-2 uppercase">
              Nueva Habilidad
            </h2>
            
            <div className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1">Nombre del Rasgo</label>
                <input 
                  type="text" value={skillDraft.name} onChange={(e) => setSkillDraft({...skillDraft, name: e.target.value})}
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 text-[#2c241b] placeholder:text-[#a39481] focus:outline-none focus:border-[#8b2e2e] shadow-sm"
                  placeholder="Ej. Carisma, Sigilo..."
                />
              </div>

              <div className="space-y-3 p-4 border-2 border-[#c4a46c] rounded-xl bg-[#f4ecd8]/50 shadow-inner">
                <label className="text-xs font-bold text-[#8b2e2e] uppercase tracking-widest">Modificadores</label>
                {skillDraft.attributes.length > 0 && (
                  <div className="flex flex-col gap-2 mb-4">
                    {skillDraft.attributes.map((attr, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-[#fdfaf3] border border-[#c4a46c] px-3 py-2 rounded-lg shadow-sm">
                        <span className="font-bold text-[#2c241b] text-sm">{attr.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-[#8b2e2e]">+{attr.value}</span>
                          <button onClick={() => handleRemoveAttribute(idx)} className="text-[#8c7b61] hover:text-[#8b2e2e] font-bold px-1 transition-colors">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-stretch gap-2">
                  <input 
                    type="text" placeholder="Aptitud" value={newAttr.name} onChange={(e) => setNewAttr({...newAttr, name: e.target.value})}
                    className="flex-1 bg-[#fdfaf3] border border-[#c4a46c] rounded-lg px-3 py-2 text-sm text-[#2c241b] placeholder:text-[#a39481] focus:outline-none focus:border-[#8b2e2e] shadow-sm"
                  />
                  <input 
                    type="number" placeholder="+ Val" value={newAttr.value} onChange={(e) => setNewAttr({...newAttr, value: e.target.value})}
                    className="w-20 bg-[#fdfaf3] border border-[#c4a46c] rounded-lg px-3 py-2 text-sm text-[#2c241b] placeholder:text-[#a39481] focus:outline-none focus:border-[#8b2e2e] shadow-sm text-center"
                  />
                  <button onClick={handleAddAttribute} className="bg-[#8b2e2e] text-[#fdfaf3] font-black px-4 rounded-lg hover:bg-[#6b2323] border-2 border-[#6b2323] shadow-[0_3px_0_#4a1616] active:translate-y-[3px] active:shadow-none transition-all">(+)</button>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-2">
              <button onClick={handleCloseModal} className="flex-1 py-3.5 bg-[#fdfaf3] border-2 border-[#c4a46c] text-[#2c241b] font-bold rounded-xl hover:bg-[#f4ecd8] shadow-[0_4px_0_#c4a46c] active:shadow-none active:translate-y-[4px] transition-all">
                Cancelar
              </button>
              <button onClick={handleSaveSkill} className="flex-1 py-3.5 bg-[#6b2323] border-2 border-[#4a1616] text-[#f4ecd8] font-bold rounded-xl hover:bg-[#521919] shadow-[0_4px_0_#4a1616] active:shadow-none active:translate-y-[4px] transition-all tracking-wide">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}