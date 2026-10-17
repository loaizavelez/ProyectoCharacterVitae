import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Hito() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingMilestoneId = location.state?.milestoneId;
  
  // 1. Estado para las herramientas guardadas en el inventario
  const [availableTools, setAvailableTools] = useState([]);

  const savedMilestones = JSON.parse(localStorage.getItem('inventarioHitos')) || [];
  const milestoneToEdit = savedMilestones.find((savedMilestone) => savedMilestone.id === editingMilestoneId);

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

  // Cargar las herramientas forjadas al abrir la pantalla
  useEffect(() => {
    const savedTools = JSON.parse(localStorage.getItem('inventarioHerramientas')) || [];
    setAvailableTools(savedTools);
  }, []);

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
    const currentMilestones = JSON.parse(localStorage.getItem('inventarioHitos')) || [];
    const updatedMilestones = editingMilestoneId
      ? currentMilestones.map((savedMilestone) => savedMilestone.id === editingMilestoneId
        ? { ...milestone, id: editingMilestoneId }
        : savedMilestone)
      : [...currentMilestones, { ...milestone, id: Date.now() }];
    localStorage.setItem('inventarioHitos', JSON.stringify(updatedMilestones));
    navigate('/home');
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-zinc-900/80 md:bg-zinc-900 border border-transparent md:border-zinc-800 rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl">
        
        {/* ==========================================
            ENCABEZADO
        =========================================== */}
        <header className="flex items-center gap-4 mb-8 md:mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Volver"
            className="p-2 bg-zinc-950 md:bg-zinc-800 border border-zinc-800 md:border-zinc-700 rounded-full hover:bg-zinc-800 hover:border-zinc-600 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-indigo-400 tracking-wide">
            {editingMilestoneId ? 'Editar hito' : 'Registro de hito'}
          </h1>
        </header>

        <form onSubmit={handleForge}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* ==========================================
                COLUMNA IZQUIERDA: Vista Previa
                Visible solo en tablet/desktop
            =========================================== */}
            <section className="hidden md:flex flex-col gap-4">
              <h2 className="text-xl font-bold text-zinc-300 font-serif">Vista previa</h2>
              
              {/* Tarjeta con borde verde emulando el diseño de la tableta[cite: 18] */}
              <article className="flex-1 min-h-[400px] border-2 border-emerald-500 bg-zinc-950 rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                
                <div className="flex justify-between items-start border-b border-zinc-800 pb-4 mb-4">
                  <div>
                    <h3 className="text-3xl font-bold font-serif text-emerald-400 capitalize break-words">
                      {milestone.name || 'Nueva hazaña'}
                    </h3>
                    <p className="text-zinc-500 uppercase tracking-widest text-xs mt-1 font-bold">
                      {milestone.guild}
                    </p>
                  </div>
                  {/* Estado de la misión */}
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border ${milestone.isActive ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-zinc-800 border-zinc-700 text-zinc-400'}`}>
                    {milestone.isActive ? 'Activa' : 'Completada'}
                  </div>
                </div>

                <p className="text-zinc-300 text-sm mb-6 flex-1 whitespace-pre-wrap">
                  {milestone.description || 'La crónica de tu logro aparecerá aquí...'}
                </p>

                {/* Insignias de herramientas en la vista previa */}
                {milestone.tools.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Herramientas</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.tools.map(tool => (
                        <span key={tool} className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-md text-xs font-medium text-emerald-400">
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
                Visible en móvil y tablet[cite: 17, 18]
            =========================================== */}
            <section className="flex flex-col gap-6">
              
              {/* Nombre de la misión[cite: 17, 18] */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-bold text-zinc-300 ml-1">Nombre de la misión</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={milestone.name}
                  onChange={handleChange}
                  placeholder="ej, unity, blender, krita"
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none text-white transition-colors"
                  required
                />
              </div>

              {/* Gremio[cite: 17, 18] */}
              <div className="space-y-1.5">
                <label htmlFor="guild" className="text-sm font-bold text-zinc-300 ml-1">Gremio</label>
                <div className="relative">
                  <select
                    id="guild"
                    name="guild"
                    value={milestone.guild}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 appearance-none focus:border-indigo-500 focus:outline-none text-white transition-colors cursor-pointer"
                  >
                    <option value="Arte digital">Arte digital</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Diseño 3D">Diseño 3D</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 font-bold">
                    V
                  </div>
                </div>
              </div>

              {/* Duración y Misión Activa[cite: 17, 18] */}
              <div className="flex items-center gap-4">
                <div className="space-y-1.5 flex-1">
                  <label htmlFor="duration" className="text-sm font-bold text-zinc-300 ml-1">Duración</label>
                  <input
                    id="duration"
                    type="text"
                    name="duration"
                    value={milestone.duration}
                    onChange={handleChange}
                    placeholder="Mes/Año"
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none text-white transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={milestone.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-zinc-700 bg-zinc-950 accent-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-zinc-300 cursor-pointer">
                    Misión activa
                  </label>
                </div>
              </div>

              {/* Crónicas / Descripción[cite: 17, 18] */}
              <div className="space-y-1.5 mt-2">
                <h3 className="text-lg font-bold text-zinc-200">Crónicas</h3>
                <textarea
                  id="description"
                  name="description"
                  value={milestone.description}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className="w-full min-h-[120px] bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-4 focus:border-indigo-500 focus:outline-none text-white transition-colors resize-y"
                  required
                />
              </div>

              {/* Herramientas utilizadas (Cargadas dinámicamente)[cite: 17, 18] */}
              <div className="space-y-3 mt-2">
                <h3 className="text-lg font-bold text-zinc-200">Herramientas utilizadas</h3>
                
                {availableTools.length === 0 ? (
                  <p className="text-sm text-zinc-500 italic">No has forjado ninguna herramienta aún.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 p-4 bg-zinc-950 border-2 border-zinc-800 rounded-xl">
                    {availableTools.map((t) => {
                      const isSelected = milestone.tools.includes(t.name);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => toggleTool(t.name)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            isSelected 
                              ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/30' 
                              : 'bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-zinc-500'
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
              BOTÓN FINAL[cite: 17, 18]
          =========================================== */}
          <div className="flex justify-center mt-12 w-full">
            <button
              type="submit"
              className="w-full md:w-2/3 lg:w-1/2 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold font-serif text-xl border-2 border-zinc-950 rounded-2xl transition-transform active:scale-95 shadow-lg"
            >
              {editingMilestoneId ? 'Guardar cambios' : 'Registrar hito'}
            </button>
          </div>
          
        </form>
      </div>
    </main>
  );
}