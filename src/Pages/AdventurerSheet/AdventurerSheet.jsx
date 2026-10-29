import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdventurerSheet() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estados para controlar la imagen y su origen
  const [portraitImg, setPortraitImg] = useState(location.state?.portrait || null);
  const [portraitSource, setPortraitSource] = useState(location.state?.portrait ? 'canvas' : null);
  const [portraitPosition, setPortraitPosition] = useState({ x: 50, y: 50 });

  const [sheetData, setSheetData] = useState({
    name: '',
    characterClass: '',
    specialty: '',
    background: ''
  });

  const handleChange = (e) => {
    setSheetData({ ...sheetData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortraitImg(reader.result); 
        setPortraitSource('upload'); // Marcamos que viene del input de archivo
        setPortraitPosition({ x: 50, y: 50 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePortraitPositionChange = (axis, value) => {
    setPortraitPosition((prev) => ({
      ...prev,
      [axis]: Number(value)
    }));
  };

  // Función para eliminar la foto actual
  const handleRemoveImage = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); // Evita que se abra el buscador de archivos o navegue al canvas
    setPortraitImg(null);
    setPortraitSource(null);
  };

  const handleForgeSheet = (e) => {
    e.preventDefault();
    
    const activeId = localStorage.getItem('usuarioActivo');
    const usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];
    const userIndex = usuariosDB.findIndex(u => u.id === activeId);

    if (userIndex !== -1) {
      usuariosDB[userIndex].profile = {
        ...usuariosDB[userIndex].profile,
        ...sheetData,
        portrait: portraitImg 
      };
      localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));
    }
    
    navigate('/home');
  };

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#2c241b] font-serif p-4 md:p-10 flex justify-center items-start md:items-center relative">
      
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%238c7b61\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')"}}></div>

      <div className="w-full max-w-5xl bg-[#fdfaf3]/90 md:bg-[#fdfaf3] border-4 border-[#c4a46c] rounded-3xl p-6 md:p-12 shadow-none md:shadow-2xl relative z-10 flex flex-col">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -top-1 -left-1 opacity-50"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1" className="absolute -bottom-1 -right-1 opacity-50 rotate-180"><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M10 14v-4a2 2 0 0 1 2-2h4"/><path d="M14 10V6a2 2 0 0 0-2-2H8"/></svg>

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
              Ficha de Aventurero
            </h1>
            <span className="text-[#8b2e2e] text-xs md:text-sm font-bold tracking-widest uppercase mt-1">Registro oficial del gremio</span>
          </div>
        </header>

        <form onSubmit={handleForgeSheet} className="flex flex-col flex-1 gap-8 md:gap-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 flex-1">
            
            {/* --- COLUMNA IZQUIERDA --- */}
            <div className="flex flex-col gap-6">
              
              <div className="space-y-1.5">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Nombre de aventurero
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={sheetData.name}
                  onChange={handleChange}
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 md:py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold text-lg md:text-xl transition-all shadow-inner"
                  placeholder="Ej. Sir Galahad"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Clase
                </label>
                <input 
                  type="text" 
                  name="characterClass"
                  value={sheetData.characterClass}
                  onChange={handleChange}
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 md:py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold text-lg md:text-xl transition-all shadow-inner"
                  placeholder="Ej. Paladín, Hechicero..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Especialidad
                </label>
                <input 
                  type="text" 
                  name="specialty"
                  value={sheetData.specialty}
                  onChange={handleChange}
                  className="w-full bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-3 md:py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] font-bold text-lg md:text-xl transition-all shadow-inner"
                  placeholder="Ej. Magia Arcana, Combate Pesado..."
                />
              </div>

            </div>

            {/* --- COLUMNA DERECHA --- */}
            <div className="flex flex-col gap-6 h-full">
              
              {/* RETRATO */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider block">
                  Retrato de aventurero
                </label>
                <div className="flex gap-4 mt-1">
                  
                  {/* Recuadro Izquierdo: Subir Foto */}
                  <label className="relative overflow-hidden flex-1 aspect-[4/3] bg-[#f4ecd8] border-2 border-[#c4a46c] hover:border-[#8b2e2e] rounded-2xl flex flex-col items-center justify-center text-[#8c7b61] hover:text-[#8b2e2e] transition-colors shadow-sm group cursor-pointer p-4">
                    {portraitImg && portraitSource === 'upload' ? (
                      <>
                        <img
                          src={portraitImg}
                          alt="Retrato subido"
                          className="absolute inset-0 w-full h-full object-cover scale-125"
                          style={{ objectPosition: `${portraitPosition.x}% ${portraitPosition.y}%` }}
                        />
                        <div className="absolute inset-0 ring-2 ring-[#fdfaf3]/80 ring-inset shadow-[inset_0_0_0_2px_rgba(253,250,243,0.8)]" />
                        <button 
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-[#8b2e2e] text-[#fdfaf3] rounded-full p-1.5 shadow-md hover:bg-[#6b2323] transition-colors z-10 opacity-0 group-hover:opacity-100"
                          title="Quitar foto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-80 group-hover:scale-110 transition-transform">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                          <circle cx="12" cy="13" r="4"/>
                          <path d="M8 3v4"/>
                          <path d="M16 3v4"/>
                        </svg>
                        <span className="text-xs uppercase font-bold tracking-widest text-center px-1">Subir Foto</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                  </label>

                  {/* Recuadro Derecho: Canvas */}
                  <button
                    type="button"
                    onClick={() => navigate('/canvas')}
                    className="relative overflow-hidden flex-1 aspect-[4/3] bg-[#f4ecd8] border-2 border-dashed border-[#8c7b61] hover:border-[#8b2e2e] rounded-2xl flex items-center justify-center text-[#8c7b61] hover:text-[#8b2e2e] transition-colors shadow-sm group p-4"
                  >
                    {portraitImg && portraitSource === 'canvas' ? (
                      <>
                        <img src={portraitImg} alt="Retrato dibujado" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: `${portraitPosition.x}% ${portraitPosition.y}%` }} />
                        <button 
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-[#8b2e2e] text-[#fdfaf3] rounded-full p-1.5 shadow-md hover:bg-[#6b2323] transition-colors z-10 opacity-0 group-hover:opacity-100"
                          title="Quitar esbozo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-80 group-hover:scale-110 transition-transform">
                          <path d="m16 5 3 3"/>
                          <path d="M4 20h4l10.5-10.5a2.12 2.12 0 0 0-4-4L4 16v4z"/>
                        </svg>
                        <span className="text-xs uppercase font-bold tracking-widest text-center px-2">Crea tu retrato</span>
                      </div>
                    )}
                  </button>
                </div>

                {portraitImg && portraitSource === 'upload' && (
                  <div className="mt-3 rounded-2xl border-2 border-[#c4a46c] bg-[#f4ecd8] p-3 shadow-inner">
                    <div className="mb-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-[#4a3f35]">
                      Ajustar máscara
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#4a3f35]">
                        Horizontal
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={portraitPosition.x}
                          onChange={(e) => handlePortraitPositionChange('x', e.target.value)}
                          className="mt-1 w-full accent-[#8b2e2e]"
                        />
                      </label>
                      <label className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#4a3f35]">
                        Vertical
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={portraitPosition.y}
                          onChange={(e) => handlePortraitPositionChange('y', e.target.value)}
                          className="mt-1 w-full accent-[#8b2e2e]"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* TRASFONDO */}
              <div className="space-y-1.5 flex flex-col flex-1">
                <label className="text-sm md:text-base font-bold text-[#4a3f35] ml-1 uppercase tracking-wider">
                  Trasfondo
                </label>
                <textarea 
                  name="background"
                  value={sheetData.background}
                  onChange={handleChange}
                  className="w-full flex-1 min-h-[120px] bg-[#f4ecd8] border-2 border-[#c4a46c] rounded-xl px-4 py-4 focus:border-[#8b2e2e] focus:outline-none text-[#2c241b] transition-colors resize-none text-base md:text-lg shadow-inner leading-relaxed"
                  placeholder="Cuenta la historia de tu origen. Las cicatrices de batallas pasadas y los anhelos de gloria futura..."
                ></textarea>
              </div>

            </div>
          </div>

          <div className="flex justify-center mt-4 pt-6 border-t-2 border-[#d0c2a8]">
            <button 
              type="submit" 
              className="w-full md:w-2/3 lg:w-1/2 py-4 md:py-5 bg-[#6b2323] hover:bg-[#521919] text-[#f4ecd8] border-2 border-[#4a1616] font-bold font-epic tracking-widest text-xl md:text-2xl rounded-2xl transition-all active:scale-95 shadow-[0_6px_0_#4a1616] active:shadow-none active:translate-y-[6px] uppercase"
            >
              Sellar Ficha
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}