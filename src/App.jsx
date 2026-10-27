import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/LandingPage/Landing';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';  
import FlipTablet from './Components/FlipTablet/FlipTablet'; // Importa el componente FlipTablet
// 1. Importas el componente del Canvas
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas'; 
import Herramientas from './Pages/Tools/Herramienta/Herramienta';
import Hito from './Pages/Tools/Hito/Hito';
import CreateAccount from './Pages/CreatAccount/AccountCreation';
import Recovery from './Pages/CreatAccount/Recovery';
import AdventurerSheet from './Pages/AdventurerSheet/AdventurerSheet';

function App() {
  return (
    <HashRouter>

    <FlipTablet />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/herramientas" element={<Herramientas />} />
        <Route path="/hitos" element={<Hito />} />
        <Route path="/registro" element={<CreateAccount />} />
        <Route path="/recuperacion" element={<Recovery />} />
        <Route path="/sheet" element={<AdventurerSheet />} />
        <Route path="/canvas" element={
          <div className="min-h-screen bg-[#f4ecd8] flex items-center justify-center p-4">
            <DrawingCanvas />
          </div>
        } />
        
      </Routes>
    </HashRouter>
  );
}

export default App;