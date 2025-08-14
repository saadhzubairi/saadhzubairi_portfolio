import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import Home from './components/home/Home';
import NavbarAnimation from './components/header/NavbarAnimation';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// The following imports are JavaScript files without TypeScript declarations.
// To fix TypeScript errors, add `// @ts-expect-error` above each import.

import PortfolioPage from './components/PortfolioPage/PortfolioPage';
// @ts-expect-error: No type declarations for ProjectPage
import ProjectPage from './components/ProjectPage/ProjectPage';
// @ts-expect-error: No type declarations for GameProjectPage
import { GameProjectPage } from './components/ProjectPage/GameProjectPage/GameProjectPage';
// @ts-expect-error: No type declarations for Quillian
import BentoSkills from './components/utils/Quillian';
import Qualifications from './components/qualifications/Qualifications';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="bg-radial-grid min-h-screen flex flex-col">
      <NavbarAnimation isVisible={isVisible} />
      <div className="relative flex-grow w-full">
        {/* Pillars animate in first */}
        <div aria-hidden className="pointer-events-none bg-textured-rails absolute inset-y-0 w-10 border-l border-r border-gray-200 dark:border-gray-700 left-[calc(50%-36rem-2.5rem)] animate-pillar-left"></div>
        <div aria-hidden className="pointer-events-none bg-textured-rails absolute inset-y-0 w-10 border-l border-r border-gray-200 dark:border-gray-700 left-[calc(50%+36rem)] animate-pillar-right"></div>

        {/* Content fades in after pillars */}
        <main className="w-full mx-auto opacity-0 animation-delay-200 animation-fill-forwards" style={{ animation: 'fade-in 500ms ease-out 300ms forwards' }}>
          {children}
        </main>
      </div>
    </div>
  );
};



function App() {
  /*   const [fontsLoaded, setFontsLoaded] = useState(false);
  
    useEffect(() => {
      document.fonts.ready.then(function () {
        setFontsLoaded(true);
      });
    }, []);
  
    if (!fontsLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <CircularProgress style={{ height: "5rem", width: "5rem", color: "#333" }} />
        </div>
      );
    } */

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <div className="">
              <Home />
              <Qualifications />
            </div>
          </Layout>} />
          <Route path="/Portfolio/" element={<Layout><PortfolioPage /></Layout>} />
          {/* 
					<Route path="/Portfolio/:ind" element={<Layout><PortfolioPage /></Layout>} />
					<Route path="/Portfolio/Project/:projectId" element={<Layout><ProjectPage /></Layout>} />
					<Route path="/Portfolio/Project/Game/:projectId" element={<Layout><GameProjectPage /></Layout>} />
					<Route path="/quillian" element={<BentoSkills />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;