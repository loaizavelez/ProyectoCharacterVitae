import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Herramienta() {
  const [tool, setTool] = useState({
    name: '',
    discipline: 'Arte digital',
    mastery: 50,
    title: '',
    description: ''
  });

  const cardRef = useRef(null);

  // Manejador de estado unificado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTool(prev => ({ ...prev, [name]: value }));
  };

  // Animación GSAP: El artefacto "brilla" al modificar la maestría
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { boxShadow: "0px 0px 0px rgba(99, 102, 241, 0)" },
        { boxShadow: "0px 0px 25px rgba(99, 102, 241, 0.4)", duration: 0.3, yoyo: true, repeat: 1 }
      );
    }
  }, [tool.mastery]);

  // Selección de ícono dinámico basado en la disciplina
  const getIcon = () => {
    switch(tool.discipline) {
      case 'Arte digital': return '🎨';
      case 'Desarrollo Logico': return '⚙️';
      case 'Diseño de Mecánicas': return '🎲';
      default: return '⚒️';
    }
  };

  const handleForge = (e) => {
    e.preventDefault();
    console.log("Forjando herramienta:", tool);
    // Aquí iría tu lógica para guardar en la base de datos
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-10 shadow-xl">
      
      {/* COLUMNA IZQUIERDA: Vista Previa del Artefacto */}
      <div className="w-full lg:w-5/12 flex justify-center items-center">
        <div 
          ref={cardRef}
          className="relative w-full max-w-sm aspect-[3/4] bg-zinc-950 border-2 border-zinc-700 rounded-lg flex flex-col justify-between p-8 text-center"
        >
          {/* Adornos de las esquinas (Estilo RPG) */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-500 m-2"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500 m-2"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-500 m-2"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-500 m-2"></div>

          <h3 className="text-2xl font-bold text-zinc-100 uppercase tracking-widest break-words min-h-[4rem] flex items-center justify-center">
            {tool.name || 'Artefacto Desconocido'}
          </h3>
          
          <div className="text-7xl drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            {getIcon()}
          </div>
          
          <div className="space-y-3 mt-4">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">
              {tool.discipline}
            </p>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300 ease-out" 
                style={{ width: `${tool.mastery}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500 uppercase">
              {tool.mastery < 30 ? 'Aprendiz' : tool.mastery < 70 ? 'Artesano' : 'Gran Maestro'}
            </p>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Formulario de la Forja */}
      <form onSubmit={handleForge} className="w-full lg:w-7/12 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-400">Nombre de la herramienta</label>
            <input 
              type="text" 
              name="name" 
              value={tool.name} 
              onChange={handleChange}
              placeholder="ej. Unity, Blender, Krita..."
              className="w-full bg-zinc-950 text-zinc-100 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-400">Disciplina</label>
            <select 
              name="discipline" 
              value={tool.discipline} 
              onChange={handleChange}
              className="w-full bg-zinc-950 text-zinc-100 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="Arte digital">Arte digital</option>
              <option value="Desarrollo Logico">Desarrollo Lógico</option>
              <option value="Diseño de Mecánicas">Diseño de Mecánicas</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 py-2">
          <div className="flex justify-between text-xs font-medium text-zinc-400 uppercase tracking-wider">
            <span>Aprendiz</span>
            <span className="text-indigo-400 font-bold">Maestría</span>
            <span>Gran Maestro</span>
          </div>
          <input 
            type="range" 
            name="mastery" 
            min="0" 
            max="100" 
            value={tool.mastery} 
            onChange={handleChange}
            className="w-full accent-indigo-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800/50">
          <h4 className="text-lg font-bold text-zinc-200">Crónicas de uso (Reporte)</h4>
          <div className="space-y-1.5">
            <input 
              type="text" 
              name="title" 
              value={tool.title} 
              onChange={handleChange}
              placeholder="Título del reporte"
              className="w-full bg-zinc-950 text-zinc-100 border border-zinc-700 rounded-lg px-4 py-2.5 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <textarea 
              name="description" 
              value={tool.description} 
              onChange={handleChange}
              placeholder="Describe cómo dominaste esta herramienta..."
              rows="4"
              className="w-full bg-zinc-950 text-zinc-100 border border-zinc-700 rounded-lg px-4 py-3 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button 
            type="submit" 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            Forjar herramienta
          </button>
        </div>
      </form>
    </div>
  );
}