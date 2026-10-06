import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TestimonialCard from './TestimonialCard';
import Button from './Button';

export default function AnimatedShowcase() {
  const containerRef = useRef(null);

  // Datos simulados de los portafolios de los usuarios
  const portfolios = [
    { id: 1, text: "He conocido proyectos maravillosos.", pos: "top-10 left-10" },
    { id: 2, text: "He conocido proyectos maravillosos.", pos: "top-1/4 right-20" },
    { id: 3, text: "He conocido proyectos maravillosos.", pos: "top-1/2 left-1/4" },
    { id: 4, text: "He conocido proyectos maravillosos.", pos: "bottom-1/3 right-1/3" },
    { id: 5, text: "He conocido proyectos maravillosos.", pos: "bottom-1/4 left-10" }
  ];

  useGSAP(() => {
    // Seleccionamos todas las tarjetas usando la clase específica
    const cards = gsap.utils.toArray('.portfolio-card');
    
    cards.forEach((card, index) => {
      // Creamos un movimiento orgánico individual para cada tarjeta
      gsap.to(card, {
        x: '+=60', // Flujo horizontal (flechas rojas)
        y: index % 2 === 0 ? '-=40' : '+=40', // Flujo vertical alterno (flechas verdes)
        duration: 4 + (index * 0.5), // Tiempos asimétricos para que no se vean robóticos
        repeat: -1, // Bucle infinito
        yoyo: true, // Va y vuelve a su posición original
        ease: "sine.inOut" // Transición suave
      });
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-zinc-950 overflow-hidden flex items-end justify-center pb-12"
    >
      {/* Tarjetas Flotantes */}
      {portfolios.map((item) => (
        <Link 
          key={item.id} 
          to={`/portafolio/${item.id}`} // Ruta dinámica (placeholder)
          className={`absolute ${item.pos} portfolio-card z-10 block max-w-[280px] hover:scale-105 transition-transform duration-300`}
        >
          {/* Reutilizamos tu componente actual */}
          <TestimonialCard text={item.text} />
        </Link>
      ))}

      {/* Botón Estático Central */}
      <div className="z-20 w-full max-w-xs">
        <Link to="/registro" className="block w-full">
          <Button type="button">
            Comienza tu aventura
          </Button>
        </Link>
      </div>
    </div>
  );
}