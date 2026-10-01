import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../../Components/Button/Button';
import TestimonialCard from '../../Components/TestimonialCard/TestimonialCard';

export default function Landing() {
  const containerRef = useRef(null);

  // Simulamos los portafolios con posiciones absolutas repartidas en la pantalla
const portfolios = [
    { id: 1, text: "He conocido proyectos maravillosos.", pos: "top-[5%] -left-[350px]" },
    { id: 2, text: "Mis proyectos tienen mayor visibilidad.", pos: "top-[25%] -left-[350px]" },
    { id: 3, text: "Por fin puedo ser mi OC.", pos: "top-[45%] -left-[350px]" },
    { id: 4, text: "El mejor lugar para mostrar mis renders y modelos 3D.", pos: "top-[65%] -left-[350px]" },
    { id: 5, text: "Ideal para documentar mis scripts y mecánicas de físicas.", pos: "top-[82%] -left-[350px]" }
  ];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.portfolio-card');
    
    // Repartimos los tiempos de inicio (0 a 35 seg) en desorden. 
    // Así evitamos que formen una línea diagonal perfecta, dándoles un aspecto orgánico.
    const startDelays = [-7, -21, -35, -14, -28]; 

    cards.forEach((card, index) => {
      // 1. Animación Horizontal: Cruzan la pantalla lentamente y sin chocar
      gsap.to(card, {
        x: '150vw', // Viaja hasta salir de la pantalla por la derecha
        duration: 35, // ⬅️ Mucho más lento (35 segundos en cruzar)
        repeat: -1, // Vuelve a aparecer por la izquierda infinitamente
        ease: "none", // Velocidad estrictamente constante
        delay: startDelays[index] // Asigna su posición inicial a lo ancho de la pantalla
      });

      // 2. Animación Vertical: Flote suave constante
      gsap.to(card, {
        y: index % 2 === 0 ? '-=20' : '+=20', 
        duration: 2.5 + (index * 0.2), 
        repeat: -1,
        yoyo: true, 
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef });
  
  return (
    <div ref={containerRef} className="relative min-h-screen bg-zinc-950 overflow-hidden font-sans flex flex-col justify-between">
      
      {/* 1. Navegación Superior (Estática, Z-index alto) */}
      <header className="absolute top-0 right-0 w-full p-4 flex justify-end z-30 pointer-events-none">
        <Link 
            to="/login" 
            className="pointer-events-auto px-5 py-2 text-sm font-semibold text-zinc-200 border-2 border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors bg-zinc-950/60 backdrop-blur-md"
        >
            Entrar
        </Link>
      </header>

      {/* 2. Título Central (Para mantener el branding en el espacio vacío) */}
      <div className="absolute top-12 w-full text-center z-20 pointer-events-none">
         <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-2xl">
          Character Vitae
        </h1>
      </div>

      {/* 3. Lienzo de Tarjetas Flotantes */}
      <div className="flex-1 w-full relative z-10 mt-20">
        {portfolios.map((item) => (
          <Link 
            key={item.id} 
            to={`/portafolio/${item.id}`} // Enlace interactivo hacia el portafolio
            className={`absolute ${item.pos} portfolio-card block w-[260px] md:w-[320px] hover:scale-105 hover:z-40 transition-transform duration-300 shadow-xl`}
          >
            <TestimonialCard text={item.text} />
          </Link>
        ))}
      </div>

      {/* 4. Botón Inferior "Comienza tu aventura" (Estático) */}
      <div className="relative z-30 w-full flex justify-center pb-12 px-6 pointer-events-none">
        <div className="w-full max-w-xs pointer-events-auto">
          <Link to="/registro" className="block w-full">
            <Button type="button">
              Comienza tu aventura
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}