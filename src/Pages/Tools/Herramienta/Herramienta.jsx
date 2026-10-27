import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import GuidedTutorial from '../../../Components/GuidedTutorial/GuidedTutorial';

export default function Herramienta() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  const editingToolId = location.state?.toolId;

  const activeUserId = localStorage.getItem('usuarioActivo');
  const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
  const activeUser = usuariosDB.find((user) => user.id === activeUserId);
  const savedTools = activeUser?.inventory?.tools || [];
  const toolToEdit = savedTools.find((savedTool) => savedTool.id === editingToolId);
  const tutorialSteps = [
    {
      element: '[data-tour="tool-preview"]',
      popover: { title: 'Vista previa', description: 'La tarjeta muestra cómo cambia el artefacto con los datos que ingresas.' },
    },
    {
      element: '[data-tour="tool-name"]',
      popover: { title: 'Nombre del artefacto', description: 'Escribe la herramienta, tecnología o recurso que quieres registrar.' },
    },
    {
      element: '[data-tour="tool-discipline"]',
      popover: { title: 'Disciplina', description: 'Clasifica el artefacto según el área en la que lo utilizas.' },
    },
    {
      element: '[data-tour="tool-mastery"]',
      popover: { title: 'Nivel de maestría', description: 'Ajusta el control para indicar tu nivel actual de dominio.' },
    },
    {
      element: '[data-tour="tool-report"]',
      popover: { title: 'Anotaciones', description: 'Añade un título y notas sobre cómo utilizas este artefacto.' },
    },
    {
      element: '[data-tour="tool-save"]',
      popover: { title: 'Guardar artefacto', description: 'Registra el artefacto para que aparezca en tu inventario.' },
    },
  ];

  // 1. Estado unificado
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
  const masteryLevel = Number(tool.mastery);
  const masteryTitle = masteryLevel < 30
    ? 'Aprendiz'
    : masteryLevel < 70
      ? 'Artesano'
      : masteryLevel === 100
        ? 'Gran Maestro'
        : 'Maestro';

  // 2. Manejador de estado en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTool(prev => ({ ...prev, [name]: value }));
  };

  // 3. Animación GSAP: El artefacto brilla al mover la maestría
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { boxShadow: "0px 0px 0px rgba(139, 46, 46, 0)" }, // Brillo carmesí
        { boxShadow: "0px 0px 30px rgba(139, 46, 46, 0.4)", duration: 0.3, yoyo: true, repeat: 1 }
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

    const activeId = localStorage.getItem('usuarioActivo');
    const users = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const userIndex = users.findIndex((user) => user.id === activeId);

    if (userIndex === -1) {
      navigate('/login');
      return;
    }

    const currentUser = users[userIndex];
    const currentTools = currentUser.inventory?.tools || [];
    const existingTool = currentTools.some((savedTool) => savedTool.id === editingToolId);

    if (editingToolId && !existingTool) {
      alert('No se encontró el artefacto en tus registros.');
      return;
    }

    const toolId = editingToolId || Date.now();
    const updatedTools = editingToolId
      ? currentTools.map((savedTool) => savedTool.id === editingToolId ? { ...tool, id: toolId } : savedTool)
      : [...currentTools, { ...tool, id: toolId }];

    users[userIndex] = {
      ...currentUser,
      inventory: {
        ...currentUser.inventory,
        tools: updatedTools
      }
    };
    localStorage.setItem('usuariosDB', JSON.stringify(users));

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
            onClick={() => navigate(-1)}
            className="p-2 text-[#2c241b] hover:text-[#8b2e2e] transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black font-epic text-[#2c241b] tracking-wider uppercase leading-none">
              {editingToolId ? 'Modificar Artefacto' : 'Registro de Artefacto'}
            </h1>
            <span className="text-[#8b2e2e] text-xs md:text-sm font-bold tracking-widest uppercase mt-1">Añadir al inventario</span>
          </div>
          <GuidedTutorial
            storageKey={`tutorial:tool:${activeUserId || 'guest'}`}
            autoStart={!editingToolId}
            steps={tutorialSteps}
          />
        </header>

        <form onSubmit={handleForge}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* ==========================================
                VISTA PREVIA (Solo Tablet/Desktop)
            =========================================== */}
            <section data-tour="tool-preview" className="hidden md:flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#8b2e2e] font-epic uppercase tracking-widest">Inspeccionar</h2>
              
              <div 
                ref={cardRef}
                className="flex-1 border-4 border-[#c4a46c] bg-[#f4ecd8] rounded-2xl p-8 flex flex-col items-center text-center relative overflow-hidden shadow-inner"
              >
                {/* Adornos de la tarjeta */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8c7b61] m-4"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8c7b61] m-4"></div>
                
                <h3 className="text-2xl font-black font-epic text-[#2c241b] uppercase break-all min-h-16 flex items-center justify-center mt-4 tracking-wide">
                  {tool.name || 'Artefacto Desconocido'}
                </h3>

                <div className="text-7xl my-6 drop-shadow-md transition-all">
                  {getIcon()}
                </div>

                <p className="text-sm font-bold text-[#8b2e2e] uppercase tracking-widest mb-6">
                  {tool.discipline}
                </p>

                <div className="w-full mt-auto">
                  <div className="flex justify-between text-xs text-[#4a3f35] font-bold mb-2 uppercase">
                    <span>Nvl. {tool.mastery}</span>
                    <span className="text-[#8b2e2e] font-black tracking-wide">
                      {masteryTitle}
                    </span>
                  </div>
                  <div className="w-full bg-[#d0c2a8] h-2.5 rounded-full overflow-hidden border border-[#c4a46c]">
                    <div 
                      className="bg-[#8b2e2e] h-full transition-all duration-300 ease-out" 
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
              
              <div data-tour="tool-name" className="space-y-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Nombre del artefacto</label>
                <input 
                  type="text" 
                  name="name"
                  value={tool.name}
                  onChange={handleChange}
                  placeholder="Ej. Espada Larga, Libro de Hechizos, React..."
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-inner font-bold"
                  required
                />
              </div>

              <div data-tour="tool-discipline" className="space-y-1.5">
                <label className="text-sm font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">Disciplina</label>
                <div className="relative">
                  <select 
                    name="discipline"
                    value={tool.discipline}
                    onChange={handleChange}
                    className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 appearance-none focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] transition-colors cursor-pointer shadow-inner font-bold"
                  >
                    <option value="Arte digital">Arte digital</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Diseño 3D">Diseño 3D</option>
                    <option value="Game Design">Game Design</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8c7b61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <div data-tour="tool-mastery" className="space-y-3 mt-2 bg-[#f4ecd8] p-4 rounded-xl border border-[#c4a46c]">
                <label className="text-sm font-bold text-[#8b2e2e] uppercase tracking-wider">Maestría</label>
                <input 
                  type="range" 
                  name="mastery"
                  min="0" 
                  max="100" 
                  value={tool.mastery}
                  onChange={handleChange}
                  className="w-full h-2 bg-[#c4a46c] rounded-lg appearance-none cursor-pointer accent-[#8b2e2e]"
                />
                <div className="grid grid-cols-3 text-xs text-[#8c7b61] font-bold px-1 uppercase tracking-widest">
                  <span className="text-left">Aprendiz</span>
                  <span className="text-center">Artesano</span>
                  <span className="text-right">Maestro</span>
                </div>
              </div>

              <div data-tour="tool-report" className="mt-2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <hr className="w-4 border-[#8b2e2e] border-t-2" />
                  <h3 className="text-xs font-bold text-[#8b2e2e] uppercase tracking-widest">Anotaciones</h3>
                </div>
                
                <input 
                  type="text" 
                  name="reportTitle"
                  value={tool.reportTitle}
                  onChange={handleChange}
                  placeholder="Título del reporte"
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3.5 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors shadow-inner font-bold"
                />
                <textarea 
                  name="reportDescription"
                  value={tool.reportDescription}
                  onChange={handleChange}
                  placeholder="Describe cómo usas este artefacto..."
                  className="w-full min-h-30 bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] placeholder:text-[#a39481] transition-colors resize-y shadow-inner leading-relaxed"
                ></textarea>
              </div>

            </section>
          </div>

          {/* ==========================================
              BOTÓN FINAL
          =========================================== */}
          <div className="flex justify-center mt-12 w-full pt-6 border-t-2 border-[#d0c2a8]">
            <button
              data-tour="tool-save"
              type="submit" 
              className="w-full md:w-2/3 lg:w-1/2 py-4 md:py-5 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold font-epic tracking-widest text-xl md:text-2xl rounded-2xl transition-all active:scale-95 shadow-[0_6px_0_#4a1616] active:shadow-none active:translate-y-1.5 uppercase"
            >
              {editingToolId ? 'Grabar Cambios' : 'Forjar Artefacto'}
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}