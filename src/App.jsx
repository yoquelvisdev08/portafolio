import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PortfolioApp from './PortfolioApp';
import PrecioPage from './pages/PrecioPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/precio" element={<PrecioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
