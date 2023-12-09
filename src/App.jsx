import { BrowserRouter } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage/FrontPage';
import Header from './components/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioPage from './components/PortfolioPage/PortfolioPage';
import ProjectPage from './components/ProjectPage/ProjectPage';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Layout = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <Header />
      {children}
    </div>
  );
};

function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(function () {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <div className="portfolio_circular_progress">
        <div className="portfolio_wrapper">
          <div className="portfolio_container">
            <CircularProgress style={{ height: "5rem", width: "5rem", color: "#333" }} />
          </div>
        </div>
      </div>
    ); // Or return a loading spinner
  }

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Layout><FrontPage /></Layout>} />
          <Route path="/Portfolio/" element={<Layout><PortfolioPage /></Layout>} />
          <Route path="/Portfolio/:ind" element={<Layout><PortfolioPage /></Layout>} />
          <Route path="/Portfolio/:projectId" element={<Layout><ProjectPage /></Layout>} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;