import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function Herramienta() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  const editingToolId = location.state?.toolId;

  const savedTools = JSON.parse(localStorage.getItem('inventarioHerramientas')) || [];
  const toolToEdit = savedTools.find((savedTool) => savedTool.id === editingToolId);

  // 1. Estado unificado (como en tu código original)
  const [tool, setTool] = useState(() => toolToEdit ? {
    ...toolToEdit,
    mastery: Number(toolToEdit.mastery)
  } : {
    name: '',
    discipline: 'Arte digital',
    mastery: 50,
    reportTitle: '',
    reportDescription: ''
  });

  // 2. Manejador de estado en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTool(prev => ({ ...prev, [name]: value }));
  };

  // 3. Animación GSAP: El artefacto brilla al mover la maestría
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { boxShadow: "0px 0px 0px rgba(16, 185, 129, 0)" }, // Brillo verde/esmeralda
        { boxShadow: "0px 0px 30px rgba(16, 185, 129, 0.6)", duration: 0.3, yoyo: true, repeat: 1 }
      );
    }
  }, [tool.mastery]);

  // 4. Íconos dinámicos según disciplina
  const getIcon = () => {
    switch(tool.discipline) {
      case 'Arte digital': return '🎨';
      case 'Desarrollo': return '⚙️';
      case 'Diseño 3D': return '🧊';
      case 'Game Design': return '🎲';
      default: return '⚒️';
    }
  };

 const handleForge = (e) => {
    e.preventDefault();
    
    const currentTools = JSON.parse(localStorage.getItem('inventarioHerramientas')) || [];
    const updatedTools = editingToolId
      ? currentTools.map((savedTool) => savedTool.id === editingToolId ? { ...tool, id: editingToolId } : savedTool)
      : [...currentTools, { ...tool, id: Date.now() }];
    localStorage.setItem('inventarioHerramientas', JSON.stringify(updatedTools));

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
            onClick={() => navigate(-1)}
            className="p-2 bg-zinc-950 md:bg-zinc-800 border border-zinc-800 md:border-zinc-700 rounded-full hover:bg-zinc-800 hover:border-zinc-600 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-indigo-400 tracking-wide">
            {editingToolId ? 'Editar herramienta' : 'Registro de herramienta'}
          </h1>
        </header>

        <form onSubmit={handleForge}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* ==========================================
                VISTA PREVIA (Solo Tablet/Desktop)
            =========================================== */}
            <section className="hidden md:flex flex-col gap-4">
              <h2 className="text-xl font-bold text-zinc-300 font-serif">Vista previa</h2>
              
              <div 
                ref={cardRef}
                className="flex-1 border-2 border-emerald-500 bg-zinc-950 rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Adornos de las esquinas */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-500/50 m-4"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-500/50 m-4"></div>
                
                <h3 className="text-2xl font-bold font-serif text-emerald-400 capitalize break-all min-h-[4rem] flex items-center justify-center mt-4">
                  {tool.name || 'Nueva Herramienta'}
                </h3>

                <div className="text-7xl my-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                  {getIcon()}
                </div>

                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">
                  {tool.discipline}
                </p>

                <div className="w-full mt-auto">
                  <div className="flex justify-between text-xs text-zinc-500 font-bold mb-2">
                    <span>Nvl. {tool.mastery}</span>
                    <span className="text-emerald-500">
                      {tool.mastery < 30 ? 'Aprendiz' : tool.mastery < 70 ? 'Artesano' : 'Gran Maestro'}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300 ease-out" 
                      style={{ width: `${tool.mastery}%` }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ==========================================
                FORMULARIO (Móvil y Tablet)
            =========================================== */}
            <section className="flex flex-col gap-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-300 ml-1">Nombre de la herramienta</label>
                <input 
                  type="text" 
                  name="name"
                  value={tool.name}
                  onChange={handleChange}
                  placeholder="ej, unity, blender, krita"
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none text-white transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-300 ml-1">Disciplina</label>
                <div className="relative">
                  <select 
                    name="discipline"
                    value={tool.discipline}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 appearance-none focus:border-indigo-500 focus:outline-none text-white transition-colors cursor-pointer"
                  >
                    <option value="Arte digital">Arte digital</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Diseño 3D">Diseño 3D</option>
                    <option value="Game Design">Game Design</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400 font-bold">
                    V
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-2">
                <label className="text-sm font-bold text-zinc-300 ml-1">Maestría</label>
                <input 
                  type="range" 
                  name="mastery"
                  min="0" 
                  max="100" 
                  value={tool.mastery}
                  onChange={handleChange}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-zinc-500 font-bold px-1">
                  <span>Aprendiz</span>
                  <span>Gran maestro</span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-bold text-zinc-200">Reporte</h3>
                <input 
                  type="text" 
                  name="reportTitle"
                  value={tool.reportTitle}
                  onChange={handleChange}
                  placeholder="Titulo"
                  className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-3 focus:border-indigo-500 focus:outline-none text-white transition-colors"
                />
                <textarea 
                  name="reportDescription"
                  value={tool.reportDescription}
                  onChange={handleChange}
                  placeholder="Descripción"
                  className="w-full min-h-[120px] bg-zinc-950 border-2 border-zinc-700 rounded-xl px-4 py-4 focus:border-indigo-500 focus:outline-none text-white transition-colors resize-y"
                ></textarea>
              </div>

            </section>
          </div>

          {/* ==========================================
              BOTÓN FINAL (Alineado abajo al centro)
          =========================================== */}
          <div className="flex justify-center mt-12 w-full">
            <button 
              type="submit" 
              className="w-full md:w-2/3 lg:w-1/2 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold font-serif text-xl border-2 border-zinc-950 rounded-2xl transition-transform active:scale-95 shadow-lg"
            >
              {editingToolId ? 'Guardar cambios' : 'Forjar herramienta'}
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}