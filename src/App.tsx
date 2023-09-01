
import './App.css';
import Menu from './pages/menu'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;


function App() {
  return (
    <>
      <Helmet>
          <title>Puro Sabor | Ordená en Línea 🛍️📲</title>
      </Helmet>
      <div className="App">
        <div className='mosaicBackground'></div>
        <Router basename="/index.html">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
