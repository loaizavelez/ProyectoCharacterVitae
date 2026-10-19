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
    tools: milestoneToEdit.tools || []
  } : {
    name: '',
    guild: 'Arte digital',
    duration: '',
    isActive: false,
    description: '',
    tools: [] // Array para guardar las herramientas seleccionadas
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMilestone((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Función para agregar/quitar herramientas al hito con un clic
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
                Visible solo en tablet/desktop
            =========================================== */}
            <section className="hidden md:flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#8b2e2e] font-epic uppercase tracking-widest">Inspeccionar</h2>
              
              <article className="flex-1 min-h-[400px] border-4 border-[#c4a46c] bg-[#f4ecd8] rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-inner">
                
                {/* Adornos de la tarjeta */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8c7b61] m-4"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8c7b61] m-4"></div>

                <div className="flex justify-between items-start gap-4 border-b-2 border-[#d0c2a8] pb-4 mb-4 mt-2">
                  <div className="min-w-0">
                    <h3 className="text-3xl font-black font-epic text-[#2c241b] uppercase break-words tracking-wide">
                      {milestone.name || 'Hazaña Desconocida'}
                    </h3>
                    <p className="text-[#8b2e2e] uppercase tracking-widest text-xs mt-1 font-bold">
                      {milestone.guild}
                    </p>
                  </div>
                  {/* Estado de la misión con whitespace-nowrap y shrink-0 */}
                  <div className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border-2 whitespace-nowrap shrink-0 ${milestone.isActive ? 'bg-[#fdfaf3] border-[#8b2e2e] text-[#8b2e2e] shadow-[0_2px_0_#8b2e2e]' : 'bg-[#e5d9c5] border-[#8c7b61] text-[#4a3f35]'}`}>
                    {milestone.isActive ? 'Misión Activa' : 'Completada'}
                  </div>
                </div>

                <p className="text-[#4a3f35] text-base mb-6 flex-1 whitespace-pre-wrap font-medium leading-relaxed">
                  {milestone.description || 'La crónica de tu logro aparecerá aquí...'}
                </p>

                {/* Insignias de herramientas en la vista previa */}
                {milestone.tools.length > 0 && (
                  <div className="mt-auto pt-4 border-t-2 border-[#d0c2a8]">
                    <p className="text-[10px] text-[#8c7b61] uppercase tracking-widest mb-3 font-bold">Artefactos Empleados</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.tools.map(tool => (
                        <span key={tool} className="px-3 py-1.5 bg-[#fdfaf3] border border-[#c4a46c] rounded-lg text-xs font-bold text-[#8b2e2e] shadow-sm uppercase tracking-wide">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </section>

            {/* ==========================================
                COLUMNA DERECHA: Formulario
                Visible en móvil y tablet
            =========================================== */}
            <section className="flex flex-col gap-6">
              
              {/* Nombre de la misión */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Nombre de la misión</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={milestone.name}
                  onChange={handleChange}
                  placeholder="Ej. Derrotar al Dragón de Bug, Lanzamiento V1..."
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
                    placeholder="Ej. 3 Lunas, 1 Año..."
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