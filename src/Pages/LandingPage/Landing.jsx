import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../../Components/Button/Button';
import TestimonialCard from '../../Components/TestimonialCard/TestimonialCard';

export default function Landing() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsAreaRef = useRef(null);
  const actionRef = useRef(null);

  const portfolios = [
    { id: 1, text: "He conocido proyectos maravillosos.", pos: "top-[5%]" },
    { id: 2, text: "Mis proyectos tienen mayor visibilidad.", pos: "top-[25%]" },
    { id: 3, text: "Por fin puedo ser mi OC.", pos: "top-[45%]" },
    { id: 4, text: "El mejor lugar para mostrar mis renders y modelos 3D.", pos: "top-[65%]" },
    { id: 5, text: "Ideal para documentar mis scripts y mecánicas de físicas.", pos: "bottom-[5%]" }
  ];
  const travelDuration = 40;
  const verticalDuration = 8;

  useGSAP(() => {
    const cards = gsap.utils.toArray('.portfolio-card');
    
    cards.forEach((card, index) => {
      const getVerticalBounds = () => {
        const cardHeight = card.offsetHeight;
        const titleBottom = titleRef.current.getBoundingClientRect().bottom;
        const actionTop = actionRef.current.getBoundingClientRect().top;
        const areaRect = cardsAreaRef.current.getBoundingClientRect();
        const baseTop = areaRect.top + card.offsetTop;
        const minTop = Math.max(areaRect.top, titleBottom + 16);
        const maxTop = Math.max(
          minTop,
          Math.min(areaRect.bottom, actionTop) - cardHeight - 16
        );

        return {
          min: minTop - baseTop,
          max: maxTop - baseTop
        };
      };

      gsap.fromTo(card, 
        { x: () => -card.offsetWidth },
        { 
          x: () => containerRef.current.clientWidth + card.offsetWidth,
          duration: travelDuration,
          ease: "none", 
          repeat: -1,
          repeatRefresh: true,
          yoyo: false,
          delay: index * -(travelDuration / portfolios.length)
        }
      );

      gsap.fromTo(card, {
        y: () => getVerticalBounds().min
      }, {
        y: () => getVerticalBounds().max,
        duration: verticalDuration,
        repeat: -1,
        yoyo: true,
        delay: index * -(verticalDuration * 2 / portfolios.length),
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-zinc-950 overflow-hidden font-sans flex flex-col justify-between">
      
      <header className="absolute top-0 right-0 w-full p-4 flex justify-end z-30 pointer-events-none">
        <Link 
            to="/login" 
            className="pointer-events-auto px-5 py-2 text-sm font-semibold text-zinc-200 border-2 border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors bg-zinc-950/60 backdrop-blur-md"
        >
            Entrar
        </Link>
      </header>

      <div ref={titleRef} className="absolute top-12 w-full text-center z-20 pointer-events-none">
         <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-2xl">
          Character Vitae
        </h1>
      </div>

      <div ref={cardsAreaRef} className="flex-1 w-full relative z-10 mt-36">
        {portfolios.map((item) => (
          <Link 
            key={item.id} 
            to={`/portafolio/${item.id}`} 
            className={`absolute left-0 ${item.pos} portfolio-card group block w-[260px] md:w-[320px] hover:z-40 shadow-xl`}
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <TestimonialCard text={item.text} />
            </div>
          </Link>
        ))}
      </div>

      <div ref={actionRef} className="relative z-30 w-full flex justify-center pb-12 px-6 pointer-events-none">
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