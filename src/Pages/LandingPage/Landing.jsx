import Button from '../../components/Button';
import TestimonialCard from '../../components/TestimonialCard';

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans">
      
      {/* 1. Navegación Superior */}
      <header className="w-full p-4 flex justify-end">
        <button className="px-5 py-2 text-sm font-semibold text-zinc-200 border-2 border-zinc-700 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer">
          Entrar
        </button>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 flex flex-col items-center pt-12 pb-8 px-6 text-center">
        
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-8">
          Character Vitae
        </h1>
        
        <div className="flex flex-col gap-2 text-zinc-400 text-lg font-medium mb-10">
          <p>Sube tus proyectos.</p>
          <p>Comparte tus logros.</p>
          <p>Sé tu personaje.</p>
        </div>

        <div className="w-full max-w-xs mb-16">
          <Button type="button">
            Crea tu cuenta
          </Button>
        </div>

        {/* 3. Valoraciones */}
        <section className="w-full max-w-sm text-left">
          <h2 className="text-xl font-bold text-zinc-100 mb-6 px-2">
            Valoraciones
          </h2>
          
          <div className="flex flex-col gap-4 pb-10">
            <TestimonialCard text="He conocido proyectos maravillosos." />
            <TestimonialCard text="Mis proyectos tienen mayor visibilidad." />
            <TestimonialCard text="Por fin puedo ser mi OC." />
          </div>
        </section>

      </main>

    </div>
  );
}