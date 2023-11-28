import { BrowserRouter } from 'react-router-dom';
import './App.css';
import FrontPage from './components/FrontPage/FrontPage';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioPage from './components/PortfolioPage/PortfolioPage';

const Layout = ({ children }) => {
  return (
    <div className="mainAppContainer">
      <Header />
      {children}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Layout><FrontPage /></Layout>}/>
          <Route path="/Portfolio" element={<Layout><PortfolioPage /></Layout>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

/* <>
      <Header />
      <main className="main">
        <FrontPage />
      </main>
    </> */