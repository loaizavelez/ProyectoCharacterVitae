import { useRef, useState, useEffect } from 'react';

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#a1a1aa'); // Color zinc-400 por defecto
  const [brushSize, setBrushSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Le damos una resolución interna alta para que las líneas no se vean pixeladas
    canvas.width = 1000;
    canvas.height = 600;
    
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, []);

  // Actualiza el color o tamaño del pincel si el usuario los cambia
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  // Función matemática para que el dibujo sea exacto en pantallas de PC o Celulares
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculamos la escala por si Tailwind redujo el tamaño del canvas en un celular
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    // Soporte para pantallas táctiles (móviles)
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault(); // Evita que la pantalla haga scroll en móviles al dibujar
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm">
      
      {/* Controles de Dibujo */}
      <div className="flex flex-wrap items-center justify-between w-full gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-zinc-400 font-medium">Color:</label>
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
          />
          
          <label className="text-sm text-zinc-400 font-medium ml-4">Grosor:</label>
          <input 
            type="range" 
            min="1" max="20" 
            value={brushSize} 
            onChange={(e) => setBrushSize(e.target.value)}
            className="w-24 accent-indigo-500 cursor-pointer"
          />
        </div>

        <button 
          onClick={clearCanvas}
          className="px-4 py-1.5 text-sm font-semibold text-zinc-200 border-2 border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          Borrar Lienzo
        </button>
      </div>

      {/* Lienzo (Canvas) */}
      <div className="w-full relative overflow-hidden rounded-xl border-2 border-zinc-800 bg-zinc-950 shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing} // Soporte Touch (Móviles)
          onTouchEnd={finishDrawing}  // Soporte Touch (Móviles)
          onTouchMove={draw}          // Soporte Touch (Móviles)
          className="w-full h-auto aspect-[5/3] cursor-crosshair touch-none"
        />
      </div>
      
    </div>
  );
}