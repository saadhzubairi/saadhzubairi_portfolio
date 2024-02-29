import { BrowserRouter } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage/FrontPage';
import Header from './components/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioPage from './components/PortfolioPage/PortfolioPage';
import ProjectPage from './components/ProjectPage/ProjectPage';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { GameProjectPage } from './components/ProjectPage/GameProjectPage/GameProjectPage';
import Quillian from './components/utils/Quillian';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Layout = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <Header />
      {children}
    </div>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333', // Replace with your desired color
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Layout><FrontPage /></Layout>} />
            <Route path="/Portfolio/" element={<Layout><PortfolioPage /></Layout>} />
            <Route path="/Portfolio/:ind" element={<Layout><PortfolioPage /></Layout>} />
            <Route path="/Portfolio/Project/:projectId" element={<Layout><ProjectPage /></Layout>} />
            <Route path="/Portfolio/Project/Game/:projectId" element={<Layout><GameProjectPage /></Layout>} />
            <Route path="/quillian" element={<Quillian />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;