import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FlipTablet() {
  const iconRef = useRef(null);

  useEffect(() => {
    // Usar gsap.context asegura que la animación funcione perfecto en React 
    // y se limpie correctamente sin trabarse
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      
      tl.to(iconRef.current, { 
          rotation: 90, 
          duration: 1.2, 
          ease: "power3.inOut" 
        })
        .to(iconRef.current, { 
          opacity: 0, 
          duration: 0.2 
        })
        .set(iconRef.current, { 
          rotation: 0 
        })
        .to(iconRef.current, { 
          opacity: 1, 
          duration: 0.3 
        });
    });

    return () => ctx.revert(); // Limpieza al desmontar
  }, []);

  return (
    // 1. ELIMINAMOS la clase 'relative' para que 'fixed' funcione
    // 2. CAMBIAMOS el fondo a oscuro transparente (bg-[#2c241b]/95) con blur
    <div className="fixed inset-0 z-[100] hidden md:portrait:flex lg:hidden bg-[#2c241b]/95 backdrop-blur-md font-serif flex-col items-center justify-center p-8">
      
      {/* Título superior en color claro para contrastar la oscuridad */}
      <div className="flex items-center gap-3 mb-12 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 drop-shadow-sm"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/><line x1="12" y1="2" x2="12" y2="15.5"/><line x1="22" y1="15.5" x2="12" y2="15.5"/><line x1="2" y1="15.5" x2="12" y2="15.5"/></svg>
        <h1 className="text-3xl md:text-4xl font-black font-epic tracking-widest text-[#fdfaf3] uppercase">
          Character Vitae
        </h1>
      </div>

      {/* Contenedor central estilo pergamino */}
      <div className="w-full max-w-md bg-[#fdfaf3] border-4 border-[#c4a46c] rounded-3xl p-10 flex flex-col items-center text-center shadow-[0_0_40px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Esquinas decorativas */}
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1.5" className="absolute top-2 left-2 opacity-60"><rect width="8" height="8" x="2" y="2" rx="2"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1.5" className="absolute top-2 right-2 opacity-60"><rect width="8" height="8" x="14" y="2" rx="2"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1.5" className="absolute bottom-2 left-2 opacity-60"><rect width="8" height="8" x="2" y="14" rx="2"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1.5" className="absolute bottom-2 right-2 opacity-60"><rect width="8" height="8" x="14" y="14" rx="2"/></svg>

        <p className="text-xl text-[#4a3f35] font-bold leading-relaxed mb-12">
          Para disfrutar esta experiencia<br />voltea tu artefacto
        </p>

        {/* Icono animado del dispositivo */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          
          {/* Flecha indicadora */}
          <svg className="absolute w-full h-full text-[#c4a46c] -top-4 -right-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M 50 10 A 40 40 0 0 1 90 50" strokeLinecap="round" />
            <polygon points="90,50 85,40 95,40" fill="currentColor" stroke="none" />
          </svg>

          {/* Tableta animada con GSAP */}
          <div 
            ref={iconRef}
            className="w-16 h-24 border-4 border-[#8b2e2e] rounded-lg bg-[#f4ecd8] flex items-center justify-center origin-center shadow-md z-10"
          >
            {/* Pantalla interior de la tableta */}
            <div className="w-12 h-20 border-2 border-[#c4a46c] bg-[#e5d9c5] rounded-sm"></div>
          </div>
        </div>

      </div>
    </div>
  );
}