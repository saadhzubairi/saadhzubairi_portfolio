import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './components/theme-provider';
import Home from './components/home/Home';
import NavbarAnimation from './components/header/NavbarAnimation';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// The following imports are JavaScript files without TypeScript declarations.
// To fix TypeScript errors, add `// @ts-expect-error` above each import where needed.

import PortfolioPage from './components/PortfolioPage/PortfolioPage';

import ProjectPage from './components/ProjectPage/ProjectPage';
import GameProjectPage from './components/ProjectPage/GameProjectPage';
// @ts-expect-error: No type declarations for Quillian
import BentoSkills from './components/utils/Quillian';
import BentoGrid from './components/about/BentoGrid';
import { ProjectH } from './components/projectHighlights/ProjectH';
import Connect from './components/connect/Connect';
import AnimatedPage from './components/AnimatedPage';

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
        <div aria-hidden className="hidden xl:block pointer-events-none bg-textured-rails absolute inset-y-0 w-10 border-l border-r border-gray-200 dark:border-gray-700 left-[calc(50%-36rem-2.5rem)]"></div>
        <div aria-hidden className="hidden xl:block pointer-events-none bg-textured-rails absolute inset-y-0 w-10 border-l border-r border-gray-200 dark:border-gray-700 left-[calc(50%+36rem)]"></div>

        {/* Content fades in after pillars */}
        <main className={`w-full mx-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Home />
                  <BentoGrid />
                  <ProjectH />
                  <Connect />
                </AnimatedPage>
              }
            />
            <Route path="/portfolio/" element={<AnimatedPage><PortfolioPage /></AnimatedPage>} />
            <Route path="/portfolio/project/:projectId" element={<AnimatedPage><ProjectPage /></AnimatedPage>} />
            <Route path="/portfolio/project/game/:projectId" element={<AnimatedPage><GameProjectPage /></AnimatedPage>} />
            <Route path="/quillian" element={<BentoSkills />} />
            {/* 
					<Route path="/Portfolio/:ind" element={<Layout><PortfolioPage /></Layout>} />
					<Route path="/Portfolio/Project/Game/:projectId" element={<Layout><GameProjectPage /></Layout>} />
					*/}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;