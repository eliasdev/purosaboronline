
import './App.css';
import Menu from './pages/menu'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';



const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;


ReactGA.initialize('G-TEMZXL6F6J');

function App() {
  return (
    <>
      <Helmet>
          <title>Puro Sabor | Ordená en Línea 🛍️📲</title>
          <meta name="description" content="Sabores únicos y entrega rápida. ¡Ordená tus 🍔🍔 ahora y disfruta de la perfección de la hamburguesa en casa!" />
        
      </Helmet>
      <div className="App">
        <ToastContainer />  
        <div className='mosaicBackground'></div>
        <Router basename="/">
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
