// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import QRCodeScanner from './pages/QRCodeScanner';

function App() {
 

  const handleScanSuccess = (uidLoja) => {
    console.log("UID da loja escaneado:", uidLoja);
    // Aqui você pode salvar em localStorage, contexto, ou ir para outra página
  };

  return (
      

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/qr" element={<QRCodeScanner onScanSuccess={handleScanSuccess} />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
