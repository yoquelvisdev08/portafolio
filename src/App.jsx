import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import PortfolioApp from './PortfolioApp';
import PrecioPage from './pages/PrecioPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioApp />} />
          <Route path="/precio" element={<PrecioPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
