import './App.css';
import About from './components/about/About';
import Header from './components/header/Header';
import Home from "./components/home/Home"
import Qualifications from './components/qualifications/Qualifications';
import Skills from './components/skills/Skills';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Qualifications />
      </main>
    </>

  );
}

export default App;
