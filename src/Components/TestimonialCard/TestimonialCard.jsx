export default function TestimonialCard({ text }) {
  return (
    <div className="p-5 border-2 border-zinc-700 rounded-xl bg-zinc-900/40 flex flex-col gap-3 hover:bg-zinc-800/50 transition-colors">
      
      {/* Fila superior: Avatar (Placeholder) y Red Social */}
      <div className="flex justify-between items-start">
        {/* Círculo con cruz (Placeholder del avatar según tu wireframe) */}
        <div className="w-10 h-10 rounded-full border-2 border-zinc-600 flex items-center justify-center bg-zinc-800/50">
          <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        {/* Ícono de la red social (X / Twitter) */}
        <span className="text-zinc-400 font-bold font-mono text-lg">
          𝕏
        </span>
      </div>

      {/* Texto de la valoración */}
      <p className="text-zinc-200 text-sm font-medium leading-relaxed">
        {text}
      </p>
      
    </div>
  );
}