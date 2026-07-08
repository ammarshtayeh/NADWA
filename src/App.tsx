import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import FloatingBot from './components/FloatingBot';
import { usePresenter } from './context/PresenterContext';

// Pages
import Home from './pages/Home';
import CurriculumPage from './pages/CurriculumPage';
import AISandboxPage from './pages/AISandboxPage';
import UnionPage from './pages/UnionPage';
import AboutPage from './pages/AboutPage';
import HowToPromptPage from './pages/HowToPromptPage';
import ResourcesPage from './pages/ResourcesPage';
import TeacherGuidePage from './pages/TeacherGuidePage';
import WorkshopPage from './pages/WorkshopPage';

// Presenter Context & Control panel
import { PresenterProvider } from './context/PresenterContext';
import PresenterPanel from './components/PresenterPanel';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppShell: React.FC = () => {
  const { presenterMode } = usePresenter();

  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden flex flex-col justify-between pt-0 presenter-active:pt-[130px] md:presenter-active:pt-[76px]">
        <PresenterPanel />
        <div className="absolute inset-0 bg-tatreez-stitch opacity-[0.015] pointer-events-none z-0"></div>
        <Navbar />
        <main className="relative z-10 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshop" element={<WorkshopPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/how-to-prompt" element={<HowToPromptPage />} />
            <Route path="/sandbox" element={<AISandboxPage />} />
            <Route path="/union" element={<UnionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/guide" element={<TeacherGuidePage />} />
          </Routes>
        </main>
        {!presenterMode && <Footer />}
        {!presenterMode && <FloatingBot />}
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <PresenterProvider>
      <Router>
        <AppShell />
      </Router>
    </PresenterProvider>
  );
};

export default App;
