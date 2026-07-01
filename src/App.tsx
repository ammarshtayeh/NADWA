import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import FloatingBot from './components/FloatingBot';

// Pages
import Home from './pages/Home';
import CurriculumPage from './pages/CurriculumPage';
import AISandboxPage from './pages/AISandboxPage';
import UnionPage from './pages/UnionPage';
import AboutPage from './pages/AboutPage';
import HowToPromptPage from './pages/HowToPromptPage';
import ResourcesPage from './pages/ResourcesPage';

// Presenter Context & Control panel
import { PresenterProvider } from './context/PresenterContext';
import PresenterPanel from './components/PresenterPanel';

// Scroll to Top Utility on Route Change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <PresenterProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden flex flex-col justify-between pt-0 presenter-active:pt-[130px] md:presenter-active:pt-[76px]">
          {/* Presenter Mode Control HUD */}
          <PresenterPanel />

          {/* Decorative Global Background Line grids */}
          <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.015] pointer-events-none z-0"></div>

          {/* Global Navigation Header */}
          <Navbar />

          {/* Main Content Pages Router */}
          <main className="relative z-10 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/how-to-prompt" element={<HowToPromptPage />} />
              <Route path="/sandbox" element={<AISandboxPage />} />
              <Route path="/union" element={<UnionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Routes>
          </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating AI Chatbot */}
        <FloatingBot />
      </div>
    </Router>
    </PresenterProvider>
  );
};

export default App;
