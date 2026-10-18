import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FlipTablet() {
  const iconRef = useRef(null);

  useEffect(() => {
    // Animación cíclica con GSAP
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

    return () => tl.kill(); // Limpieza al desmontar
  }, []);

  return (
    // La magia de Tailwind: 
    // hidden -> oculto por defecto (ej. móviles)
    // md:portrait:flex -> visible en tablets en posición vertical
    // lg:hidden -> oculto en monitores de escritorio
    <div className="fixed inset-0 z-[100] hidden md:portrait:flex lg:hidden bg-zinc-950 flex-col items-center justify-center p-8">
      
      {/* Título superior */}
      <h1 className="text-4xl font-bold font-serif text-indigo-400 mb-12 tracking-wide">
        Character Vitae
      </h1>

      {/* Contenedor central gris[cite: 14] */}
      <div className="w-full max-w-md bg-zinc-900 border-2 border-zinc-700 rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl">
        
        <p className="text-xl text-zinc-200 font-medium leading-relaxed mb-12">
          Para disfrutar esta experiencia<br />voltea tu dispositivo
        </p>

        {/* Icono animado del dispositivo[cite: 14] */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Flecha indicadora estática (opcional, para dar contexto) */}
          <svg className="absolute w-full h-full text-zinc-700 -top-4 -right-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M 50 10 A 40 40 0 0 1 90 50" strokeLinecap="round" />
            <polygon points="90,50 85,40 95,40" fill="currentColor" stroke="none" />
          </svg>

          {/* Tableta animada con GSAP */}
          <div 
            ref={iconRef}
            className="w-16 h-24 border-4 border-indigo-400 rounded-lg bg-zinc-950 flex items-center justify-center origin-center"
          >
            {/* Pantalla interior de la tableta */}
            <div className="w-12 h-20 border border-zinc-800 rounded-sm"></div>
          </div>
        </div>

      </div>
    </div>
  );
}