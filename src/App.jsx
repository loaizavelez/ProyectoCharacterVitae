import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/LandingPage/Landing';
import Login from './Pages/Login/Login';
// 1. Importas el componente del Canvas
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        
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