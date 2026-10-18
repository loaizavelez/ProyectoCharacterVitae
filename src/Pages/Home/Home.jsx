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
  // CARGAR DATOS
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
    } else {
      navigate('/login');
    }

    setToolsList(JSON.parse(localStorage.getItem('inventarioHerramientas')) || []);
    setMilestonesList(JSON.parse(localStorage.getItem('inventarioHitos')) || []);
    setSkillsList(JSON.parse(localStorage.getItem('inventarioHabilidades')) || []);
  };

  // ==========================================
  // LÓGICA DE PARTIDA (JSON)
  // ==========================================
  const exportarPersonaje = () => {
    const activeId = localStorage.getItem('usuarioActivo');
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const currentUser = usuariosDB.find(u => u.id === activeId);

    if (!currentUser) return;

    // Empaquetamos todo el estado actual del jugador
    const partidaGuardada = {
      usuario: currentUser,
      habilidades: JSON.parse(localStorage.getItem('inventarioHabilidades')) || [],
      herramientas: JSON.parse(localStorage.getItem('inventarioHerramientas')) || [],
      hitos: JSON.parse(localStorage.getItem('inventarioHitos')) || []
    };

    const blob = new Blob([JSON.stringify(partidaGuardada, null, 2)], { type: "application/json" });
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
        const partida = JSON.parse(e.target.result);
        
        // 1. Guardar o actualizar el usuario en la base de datos
        const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
        const index = usuariosDB.findIndex(u => u.id === partida.usuario.id);
        if (index >= 0) {
          usuariosDB[index] = partida.usuario; // Actualiza si ya existía
        } else {
          usuariosDB.push(partida.usuario); // Agrega si es nuevo en esta PC
        }
        localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));
        localStorage.setItem('usuarioActivo', partida.usuario.id);

        // 2. Restaurar sus inventarios
        localStorage.setItem('inventarioHabilidades', JSON.stringify(partida.habilidades));
        localStorage.setItem('inventarioHerramientas', JSON.stringify(partida.herramientas));
        localStorage.setItem('inventarioHitos', JSON.stringify(partida.hitos));

        // 3. Refrescar la pantalla
        cargarDatosPantalla();
        alert('Partida restaurada con éxito.');
        
      } catch (error) {
        alert("El pergamino (archivo JSON) está corrupto.");
      }
    };
    reader.readAsText(file);
    
    // Limpiar el input para permitir subir el mismo archivo dos veces si es necesario
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
    localStorage.setItem('inventarioHabilidades', JSON.stringify(updatedSkills));
    
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-12 flex flex-col items-center overflow-x-hidden relative">
      
      {/* PANEL DE CONTROL SUPERIOR */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-30">
        
        {/* Botón Guardar Partida */}
        <button 
          onClick={exportarPersonaje}
          className="text-xs font-bold text-zinc-400 hover:text-indigo-400 uppercase tracking-widest transition-colors flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Guardar
        </button>

        {/* Input Oculto y Botón para Cargar Partida */}
        <label className="text-xs font-bold text-zinc-400 hover:text-emerald-400 uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          Cargar
          <input 
            type="file" 
            accept=".json" 
            onChange={importarPersonaje} 
            className="hidden" 
          />
        </label>

        <span className="text-zinc-700">|</span>

        <button 
          onClick={handleLogout}
          className="text-xs font-bold text-zinc-500 hover:text-red-400 uppercase tracking-widest transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="w-full max-w-4xl flex flex-col mt-8">
        
        {/* ==========================================
            ENCABEZADO: Perfil Dinámico
        =========================================== */}
        <header className="flex justify-between items-start w-full mb-12">
          <div className="z-10 mt-2">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-indigo-400 leading-tight mb-4 capitalize">
              {activeProfile.name}
            </h1>
            <ul className="space-y-2 text-sm md:text-base text-zinc-300 font-medium capitalize">
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full border border-zinc-400"></span>{activeProfile.location}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full border border-zinc-400"></span>Rango: {activeProfile.educationLevel}</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full border border-zinc-400"></span>{activeProfile.institution}</li>
            </ul>
          </div>
          
          <div className={`flex items-center rounded-3xl transition-all duration-500 ease-in-out overflow-hidden ${starExpanded ? 'bg-zinc-900/90 border border-zinc-800 p-5 shadow-2xl backdrop-blur-sm' : 'p-2 border border-transparent'}`}>
            <button 
              onClick={() => setStarExpanded(!starExpanded)}
              className={`relative flex items-center justify-center shrink-0 transition-all duration-500 ease-out z-20 ${starExpanded ? 'w-24 h-24 md:w-28 md:h-28 text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] mr-4' : 'w-10 h-10 md:w-12 md:h-12 text-zinc-400 hover:text-yellow-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-colors duration-500" viewBox="0 0 24 24" fill={starExpanded ? "currentColor" : "none"} stroke="currentColor" strokeWidth={starExpanded ? "1" : "2"} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span className={`absolute font-black uppercase tracking-tight transition-all duration-500 pointer-events-none text-center leading-none ${starExpanded ? 'opacity-100 text-zinc-950 text-[10px] md:text-xs mt-3 scale-100' : 'opacity-0 text-[0px] scale-50'}`}>{activeProfile.educationLevel}</span>
            </button>
            <div className={`flex flex-col justify-center transition-all duration-500 ease-in-out ${starExpanded ? 'max-w-[400px] opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-8'}`}>
              <div className="whitespace-nowrap min-w-max pr-4">
                <h3 className="text-xl md:text-2xl font-bold font-serif text-zinc-100 leading-none capitalize">{activeProfile.institution}</h3>
                <p className="text-[10px] md:text-xs text-zinc-400 mb-4 mt-1.5 uppercase tracking-widest font-semibold">Base principal</p>
              </div>
            </div>
          </div>
        </header>

        {/* ==========================================
            SECCIÓN CENTRAL: Habilidades / Rasgos
        =========================================== */}
        <section className="mb-12 w-full flex flex-col items-center">
          <h2 className="text-lg font-bold font-serif text-zinc-100 mb-6 w-full text-left md:text-center">Rasgos y Habilidades</h2>
          <div className="flex flex-row overflow-x-auto w-full gap-4 py-6 px-4 custom-scrollbar md:justify-center">
            {skillsList.map(skill => (
              <div key={skill.id} className="w-36 md:w-40 shrink-0 aspect-[2/3] bg-zinc-900 border-2 border-zinc-700 rounded-xl flex flex-col p-4 shadow-lg hover:border-indigo-500 transition-colors">
                <div className="flex justify-center mb-auto mt-2 text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </div>
                <h3 className="text-center font-bold text-zinc-100 mb-4 truncate w-full">{skill.name}</h3>
                <div className="flex flex-col gap-1 text-[10px] md:text-xs font-medium text-zinc-400 w-full">
                  {skill.attributes.map((attr, index) => (
                    <div key={index} className="flex justify-between w-full">
                      <span className="truncate">{attr.name}</span>
                      <span className="text-indigo-400">+{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setShowSkillModal(true)} className="w-36 md:w-40 shrink-0 aspect-[2/3] bg-zinc-900/50 border-2 border-dashed border-zinc-700 hover:border-indigo-500 hover:bg-zinc-900 rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-indigo-400 transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
              <span className="text-6xl font-light mb-2">+</span>
              <span className="text-xs font-bold uppercase tracking-widest">Agregar</span>
            </button>
          </div>
        </section>

        {/* ==========================================
            INVENTARIO: Herramientas e Hitos
        =========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col h-[250px]">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2 shrink-0">
              <h3 className="text-xl font-bold font-serif text-zinc-100">Herramientas</h3>
              <button onClick={() => navigate('/herramientas')} className="text-2xl font-light text-zinc-400 hover:text-indigo-400 transition-colors px-2">+</button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
              {toolsList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50"><span className="text-zinc-400 text-sm italic">Sin herramientas</span></div>
              ) : (
                toolsList.map((t) => (
                  <button key={t.id} type="button" onClick={() => navigate('/herramientas', { state: { toolId: t.id } })} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex justify-between items-center text-left group hover:border-emerald-500/50 transition-colors cursor-pointer">
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-emerald-400 text-sm truncate">{t.name}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">{t.discipline}</span>
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

          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col h-[250px]">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2 shrink-0">
              <h3 className="text-xl font-bold font-serif text-zinc-100">Hitos</h3>
              <button onClick={() => navigate('/hitos')} className="text-2xl font-light text-zinc-400 hover:text-indigo-400 transition-colors px-2">+</button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
              {milestonesList.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50"><span className="text-zinc-400 text-sm italic">Sin hitos</span></div>
              ) : (
                milestonesList.map((milestone) => (
                  <button key={milestone.id} type="button" onClick={() => navigate('/hitos', { state: { milestoneId: milestone.id } })} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex flex-col gap-1 text-left hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <span className="font-bold text-indigo-400 text-sm truncate">{milestone.name}</span>
                    <span className="text-xs text-zinc-400 line-clamp-2">{milestone.description}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

      </div>

      {/* MODAL DE HABILIDADES */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-200 border-2 border-zinc-400 rounded-xl p-6 w-full max-w-sm flex flex-col gap-6 shadow-2xl relative">
            <h2 className="text-2xl font-bold text-zinc-900 font-serif text-center">Habilidad</h2>
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-zinc-800">Nombre de la habilidad</label>
                <input 
                  type="text" value={skillDraft.name} onChange={(e) => setSkillDraft({...skillDraft, name: e.target.value})}
                  className="w-full bg-white border border-zinc-400 rounded-lg px-4 py-3 text-zinc-900 focus:outline-none focus:border-indigo-500 shadow-sm"
                  placeholder="ej. Carisma, Inteligencia..."
                />
              </div>
              <div className="space-y-3 p-4 border border-zinc-300 rounded-lg bg-zinc-100/80 shadow-inner">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Modificadores</label>
                {skillDraft.attributes.length > 0 && (
                  <div className="flex flex-col gap-2 mb-4">
                    {skillDraft.attributes.map((attr, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white border border-zinc-200 px-3 py-2 rounded-md shadow-sm">
                        <span className="font-semibold text-zinc-700 text-sm">{attr.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-indigo-600">+{attr.value}</span>
                          <button onClick={() => handleRemoveAttribute(idx)} className="text-red-400 hover:text-red-600 font-bold px-1">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-stretch gap-2">
                  <input 
                    type="text" placeholder="Aptitud" value={newAttr.name} onChange={(e) => setNewAttr({...newAttr, name: e.target.value})}
                    className="flex-1 bg-white border border-zinc-400 rounded-md px-3 py-2 text-sm text-zinc-900 focus:outline-none shadow-sm"
                  />
                  <input 
                    type="number" placeholder="+ Val" value={newAttr.value} onChange={(e) => setNewAttr({...newAttr, value: e.target.value})}
                    className="w-20 bg-white border border-zinc-400 rounded-md px-3 py-2 text-sm text-zinc-900 focus:outline-none shadow-sm"
                  />
                  <button onClick={handleAddAttribute} className="bg-zinc-900 text-white font-bold px-4 rounded-md hover:bg-zinc-700 shadow-sm">(+)</button>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4 mt-2">
              <button onClick={handleCloseModal} className="flex-1 py-3 bg-zinc-200 border-2 border-zinc-800 text-zinc-900 font-bold rounded-xl hover:bg-zinc-300 shadow-[3px_3px_0px_rgba(39,39,42,1)] active:shadow-none active:translate-y-[3px] active:translate-x-[3px]">Cancelar</button>
              <button onClick={handleSaveSkill} className="flex-1 py-3 bg-zinc-200 border-2 border-zinc-800 text-zinc-900 font-bold rounded-xl hover:bg-zinc-300 shadow-[3px_3px_0px_rgba(39,39,42,1)] active:shadow-none active:translate-y-[3px] active:translate-x-[3px]">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}