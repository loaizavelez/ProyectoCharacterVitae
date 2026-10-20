import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawingCanvas() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2c241b'); // Tinta oscura por defecto
  const [brushSize, setBrushSize] = useState(3);
  
  // Herramientas: 'pen' (pluma), 'eraser' (borrador), 'rect' (rectángulo), 'circle' (círculo)
  const [tool, setTool] = useState('pen'); 
  
  // Estados para calcular formas geométricas
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Resolución interna alta
    canvas.width = 1000;
    canvas.height = 600;
    
    const context = canvas.getContext("2d");
    
    // Rellenamos el fondo con el color del pergamino para que no sea transparente al descargar
    context.fillStyle = "#f4ecd8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

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
    e.preventDefault(); 
    const { x, y } = getCoordinates(e);
    const ctx = contextRef.current;

    setIsDrawing(true);
    setStartX(x);
    setStartY(y);
    
    // Guardamos una "foto" del lienzo actual antes de empezar a dibujar la nueva forma
    setSnapshot(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = contextRef.current;

    // Configuramos el estilo actual del pincel
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === 'eraser' ? '#f4ecd8' : color; 

    if (tool === 'pen' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'rect') {
      // Restauramos la foto anterior para que el rectángulo no deje un "rastro" al arrastrar
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    } else if (tool === 'circle') {
      ctx.putImageData(snapshot, 0, 0);
      ctx.beginPath();
      const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const finishDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    ctx.fillStyle = "#f4ecd8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'Retrato_Aventurero.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const useDrawingAsPortrait = () => {
    navigate('/sheet', {
      state: { portrait: canvasRef.current.toDataURL('image/png') }
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto p-6 md:p-8 bg-[#fdfaf3] rounded-3xl border-4 border-[#c4a46c] shadow-2xl relative">
      
      {/* Decoración de las esquinas */}
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1.5" className="absolute top-2 left-2"><rect width="8" height="8" x="2" y="2" rx="2"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#c4a46c" strokeWidth="1.5" className="absolute top-2 right-2"><rect width="8" height="8" x="14" y="2" rx="2"/></svg>
      
      <h2 className="text-2xl md:text-3xl font-black font-epic text-[#2c241b] tracking-wider uppercase border-b-2 border-[#8b2e2e] pb-2 w-full text-center">
        Lienzo del Cartógrafo
      </h2>

      {/* Controles de Dibujo */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 bg-[#f4ecd8] border-2 border-[#c4a46c] p-4 rounded-xl shadow-inner">
        
        {/* Herramientas Principales */}
        <div className="flex items-center gap-2">
          <button onClick={() => setTool('pen')} className={`p-2 rounded-lg border-2 transition-all ${tool === 'pen' ? 'bg-[#c4a46c] border-[#8c7b61] text-[#fdfaf3]' : 'bg-[#fdfaf3] border-[#d0c2a8] text-[#8c7b61] hover:border-[#c4a46c]'}`} title="Pluma">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
          </button>
          <button onClick={() => setTool('eraser')} className={`p-2 rounded-lg border-2 transition-all ${tool === 'eraser' ? 'bg-[#c4a46c] border-[#8c7b61] text-[#fdfaf3]' : 'bg-[#fdfaf3] border-[#d0c2a8] text-[#8c7b61] hover:border-[#c4a46c]'}`} title="Borrador">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
          </button>
          <div className="w-px h-8 bg-[#c4a46c] mx-1"></div>
          <button onClick={() => setTool('rect')} className={`p-2 rounded-lg border-2 transition-all ${tool === 'rect' ? 'bg-[#c4a46c] border-[#8c7b61] text-[#fdfaf3]' : 'bg-[#fdfaf3] border-[#d0c2a8] text-[#8c7b61] hover:border-[#c4a46c]'}`} title="Rectángulo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
          </button>
          <button onClick={() => setTool('circle')} className={`p-2 rounded-lg border-2 transition-all ${tool === 'circle' ? 'bg-[#c4a46c] border-[#8c7b61] text-[#fdfaf3]' : 'bg-[#fdfaf3] border-[#d0c2a8] text-[#8c7b61] hover:border-[#c4a46c]'}`} title="Círculo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
          </button>
        </div>

        {/* Tinta y Grosor */}
        <div className="flex items-center gap-3 border-l-2 border-[#d0c2a8] pl-4">
          <label className="text-xs md:text-sm text-[#4a3f35] font-bold uppercase tracking-wider">Tinta:</label>
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === 'eraser'}
            className={`w-8 h-8 rounded cursor-pointer bg-transparent border-2 border-[#c4a46c] p-0.5 ${tool === 'eraser' ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          
          <label className="text-xs md:text-sm text-[#4a3f35] font-bold uppercase tracking-wider ml-2 md:ml-4">Grosor:</label>
          <input 
            type="range" 
            min="1" max="30" 
            value={brushSize} 
            onChange={(e) => setBrushSize(e.target.value)}
            className="w-20 md:w-28 accent-[#8b2e2e] cursor-pointer"
          />
        </div>

      </div>

      {/* Lienzo (Canvas) */}
      <div className="w-full relative overflow-hidden rounded-xl border-2 border-[#8c7b61] shadow-inner bg-[#f4ecd8] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseOut={finishDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing} 
          onTouchEnd={finishDrawing}  
          onTouchMove={draw}          
          className="w-full h-auto aspect-[5/3] touch-none"
        />
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-wrap justify-between items-center gap-4 w-full mt-2">
        
        {/* Botón para volver atrás */}
        <button
          type="button"
          onClick={() => navigate('/sheet')}
          className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-[#8c7b61] bg-transparent border-2 border-[#d0c2a8] rounded-xl hover:bg-[#e5d9c5] hover:text-[#4a3f35] transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Volver
        </button>

        <div className="flex flex-wrap justify-end gap-3 flex-1">
          <button
            type="button"
            onClick={clearCanvas}
            className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-[#8c7b61] border-2 border-[#d0c2a8] rounded-xl hover:bg-[#f4ecd8] hover:text-[#8b2e2e] transition-colors"
          >
            Borrar Todo
          </button>
          
          <button
            type="button"
            onClick={downloadImage}
            className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-[#4a3f35] bg-[#fdfaf3] border-2 border-[#c4a46c] rounded-xl hover:bg-[#f4ecd8] transition-colors flex items-center gap-2 shadow-[0_3px_0_#c4a46c] active:translate-y-[3px] active:shadow-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Descargar
          </button>

          <button
            type="button"
            onClick={useDrawingAsPortrait}
            className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-[#fdfaf3] bg-[#6b2323] border-2 border-[#4a1616] rounded-xl hover:bg-[#521919] transition-colors shadow-[0_3px_0_#4a1616] active:translate-y-[3px] active:shadow-none"
          >
            Usar Retrato
          </button>
        </div>
      </div>
      
    </div>
  );
}