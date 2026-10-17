import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/LandingPage/Landing';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';  
import FlipTablet from './Components/FlipTablet/FlipTablet'; // Importa el componente FlipTablet
// 1. Importas el componente del Canvas
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas'; 
import Herramientas from './Components/Herramienta/Herramienta';

function App() {
  return (
    <BrowserRouter>

    <FlipTablet />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/herramientas" element={<Herramientas />} />
        
        <Route path="/canvas" element={
          <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <DrawingCanvas />
          </div>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;