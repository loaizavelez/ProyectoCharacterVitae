import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Hito() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingMilestoneId = location.state?.milestoneId;
  
  // 1. Cargar base de datos unificada
  const activeUserId = localStorage.getItem('usuarioActivo');
  const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
  const activeUser = usuariosDB.find((user) => user.id === activeUserId);
  
  const savedMilestones = activeUser?.inventory?.milestones || [];
  const milestoneToEdit = savedMilestones.find((savedMilestone) => savedMilestone.id === editingMilestoneId);
  const availableTools = activeUser?.inventory?.tools || [];

  // 2. Estado unificado del hito
  const [milestone, setMilestone] = useState(() => milestoneToEdit ? {
    ...milestoneToEdit,
    tools: milestoneToEdit.tools || [],
    image: milestoneToEdit.image || null
  } : {
    name: '',
    guild: 'Arte digital',
    duration: '',
    isActive: false,
    description: '',
    tools: [], 
    image: null 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMilestone((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMilestone((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file); 
    }
  };

  const toggleTool = (toolName) => {
    setMilestone((prev) => {
      const isSelected = prev.tools.includes(toolName);
      if (isSelected) {
        return { ...prev, tools: prev.tools.filter(t => t !== toolName) };
      } else {
        return { ...prev, tools: [...prev.tools, toolName] };
      }
    });
  };

  const handleForge = (e) => {
    e.preventDefault();

    if (!activeUser) {
      navigate('/login');
      return;
    }

    const currentMilestones = activeUser.inventory?.milestones || [];
    const updatedMilestones = editingMilestoneId
      ? currentMilestones.map((savedMilestone) => savedMilestone.id === editingMilestoneId
        ? { ...milestone, id: editingMilestoneId }
        : savedMilestone)
      : [...currentMilestones, { ...milestone, id: Date.now() }];
    
    const userIndex = usuariosDB.findIndex((user) => user.id === activeUserId);
    usuariosDB[userIndex] = {
      ...activeUser,
      inventory: {
        ...activeUser.inventory,
        milestones: updatedMilestones
      }
    };

    localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));
    navigate('/home');
  };

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif p-6 md:p-10 flex flex-col items-center relative">
      
      {/* Marca de agua decorativa */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%238c7b61\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')"}}></div>

      <div className="w-full max-w-5xl bg-[#fdfaf3]/90 md:bg-[#fdfaf3] border-4 border-[#c4a46c] rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl relative z-10">
        
        {/* Decoraciones en las esquinas */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -top-1 -left-1 opacity-50"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -bottom-1 -right-1 opacity-50 rotate-180"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>

        {/* ==========================================
            ENCABEZADO
        =========================================== */}
        <header className="flex items-center gap-4 mb-8 md:mb-10 border-b-2 border-[#8b2e2e] pb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Volver"
            className="p-2 text-[#2c241b] hover:text-[#8b2e2e] transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors">
              <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
            </svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black font-epic text-[#2c241b] tracking-wider uppercase leading-none">
              {editingMilestoneId ? 'Modificar Hito' : 'Registro de Hito'}
            </h1>
            <span className="text-[#8b2e2e] text-xs md:text-sm font-bold tracking-widest uppercase mt-1">Crónicas y Hazañas</span>
          </div>
        </header>

        <form onSubmit={handleForge}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* ==========================================
                COLUMNA IZQUIERDA: Vista Previa
            =========================================== */}
            <section className="hidden md:flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#8b2e2e] font-epic uppercase tracking-widest">Vista Previa</h2>
              
              <article className="flex-1 border-2 border-[#c4a46c] bg-[#fdfaf3] rounded-xl flex flex-col overflow-hidden shadow-lg h-full">
                
                {/* IMAGEN CUBRIENDO LA CABECERA (Estilo Carta) */}
                {milestone.image ? (
                  <div className="w-full h-48 lg:h-64 border-b-2 border-[#c4a46c] shrink-0">
                    <img 
                      src={milestone.image} 
                      alt="Ilustración de la hazaña" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 lg:h-64 bg-[#e5d9c5] border-b-2 border-[#c4a46c] flex items-center justify-center shrink-0">
                    <span className="text-[#8c7b61] font-bold uppercase tracking-widest text-xs flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      Sin ilustración
                    </span>
                  </div>
                )}

                {/* CONTENIDO DE LA TARJETA */}
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Fila de Estado y XP */}
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest mb-3">
                    {milestone.isActive ? (
                      <span className="text-[#8b2e2e] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8b2e2e] animate-pulse"></span>
                        Misión Activa
                      </span>
                    ) : (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        Completada
                      </span>
                    )}
                    <span className="text-[#8b2e2e]">+400 XP</span>
                  </div>

                  {/* Título Principal */}
                  <h3 className="text-3xl font-black font-epic text-[#2c241b] uppercase break-words tracking-wide leading-tight mb-1">
                    {milestone.name || 'Hazaña Desconocida'}
                  </h3>

                  {/* Subtítulo (Gremio y Fecha) */}
                  <p className="text-[#8c7b61] text-sm font-medium mb-4">
                    {milestone.guild} {milestone.duration && `· ${milestone.duration}`}
                  </p>

                  {/* Descripción */}
                  <p className="text-[#4a3f35] text-base mb-6 flex-1 whitespace-pre-wrap font-medium leading-relaxed">
                    {milestone.description || 'La crónica de tu logro aparecerá aquí...'}
                  </p>

                  {/* Herramientas e Insignias Inferiores */}
                  {milestone.tools.length > 0 && (
                    <div className="mt-auto flex items-center flex-wrap gap-2 text-sm pt-4 border-t border-[#d0c2a8]/50">
                      <span className="px-2 py-1 bg-[#f4ecd8] border border-[#c4a46c] rounded text-[10px] font-black text-[#2c241b] uppercase tracking-widest">
                        Legendario
                      </span>
                      <span className="text-[#8c7b61] font-medium">
                        {milestone.tools.join(' · ')}
                      </span>
                    </div>
                  )}

                </div>
              </article>
            </section>

            {/* ==========================================
                COLUMNA DERECHA: Formulario
            =========================================== */}
            <section className="flex flex-col gap-6">
              
              {/* Imagen (Opcional) */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Ilustración de la hazaña</label>
                <label className="flex items-center justify-center w-full bg-[#f4ecd8] border-2 border-dashed border-[#8c7b61] hover:border-[#8b2e2e] rounded-xl px-4 py-6 cursor-pointer text-[#8c7b61] hover:text-[#8b2e2e] transition-colors shadow-inner group">
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:scale-110 transition-transform">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span className="text-[11px] uppercase tracking-widest text-center px-2 font-bold">
                      {milestone.image ? 'Cambiar ilustración' : 'Subir pergamino visual (PNG/JPG)'}
                    </span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </label>
              </div>

              {/* Nombre de la misión */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Nombre de la misión</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={milestone.name}
                  onChange={handleChange}
                  placeholder="Ej. El Observatorio Astral..."
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-inner font-bold"
                  required
                />
              </div>

              {/* Gremio */}
              <div className="space-y-1.5">
                <label htmlFor="guild" className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Gremio / Especialidad</label>
                <div className="relative">
                  <select
                    id="guild"
                    name="guild"
                    value={milestone.guild}
                    onChange={handleChange}
                    className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 appearance-none focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] transition-colors cursor-pointer shadow-inner font-bold"
                  >
                    <option value="Arte digital">Arte digital</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Diseño 3D">Diseño 3D</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              {/* Duración y Misión Activa */}
              <div className="flex items-center gap-4">
                <div className="space-y-1.5 flex-1">
                  <label htmlFor="duration" className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Duración</label>
                  <input
                    id="duration"
                    type="text"
                    name="duration"
                    value={milestone.duration}
                    onChange={handleChange}
                    placeholder="Ej. Sep 1-30, 2026..."
                    className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-inner font-bold"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={milestone.isActive}
                    onChange={handleChange}
                    className="w-6 h-6 rounded-md border-2 border-[#c4a46c] bg-[#f4ecd8] accent-[#8b2e2e] cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-[#8b2e2e] uppercase tracking-wider cursor-pointer">
                    Misión en curso
                  </label>
                </div>
              </div>

              {/* Crónicas / Descripción */}
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <hr className="w-4 border-[#8b2e2e] border-t-2" />
                  <h3 className="text-xs font-bold text-[#8b2e2e] uppercase tracking-widest">Crónicas de la Hazaña</h3>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={milestone.description}
                  onChange={handleChange}
                  placeholder="Redacta la historia de tu logro..."
                  className="w-full min-h-[120px] bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors resize-y shadow-inner leading-relaxed"
                  required
                />
              </div>

              {/* Herramientas utilizadas */}
              <div className="space-y-3 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <hr className="w-4 border-[#8b2e2e] border-t-2" />
                  <h3 className="text-xs font-bold text-[#8b2e2e] uppercase tracking-widest">Artefactos Equipados</h3>
                </div>
                
                {availableTools.length === 0 ? (
                  <p className="text-sm text-[#8c7b61] italic font-medium p-4 bg-[#f4ecd8] rounded-xl border border-[#c4a46c]">No has forjado ningún artefacto en tu inventario aún.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-5 bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl shadow-inner">
                    {availableTools.map((t) => {
                      const isSelected = milestone.tools.includes(t.name);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTool(t.name)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border-2 ${
                            isSelected 
                              ? 'bg-[#8b2e2e] text-[#f4ecd8] border-[#4a1616] shadow-[0_3px_0_#4a1616] translate-y-[-2px]' 
                              : 'bg-[#fdfaf3] text-[#8c7b61] border-[#c4a46c] hover:border-[#8b2e2e] hover:text-[#8b2e2e]'
                          }`}
                        >
                          {t.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </section>
          </div>

          {/* ==========================================
              BOTÓN FINAL
          =========================================== */}
          <div className="flex justify-center mt-12 w-full pt-6 border-t-2 border-[#d0c2a8]">
            <button
              type="submit"
              className="w-full md:w-2/3 lg:w-1/2 py-4 md:py-5 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold font-epic tracking-widest text-xl md:text-2xl rounded-2xl transition-all active:scale-95 shadow-[0_6px_0_#4a1616] active:shadow-none active:translate-y-[6px] uppercase"
            >
              {editingMilestoneId ? 'Sellar Cambios' : 'Registrar Hazaña'}
            </button>
          </div>
          
        </form>
      </div>
    </main>
  );
}