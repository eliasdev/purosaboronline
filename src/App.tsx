import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './modules/sections/header'
import Menu from './pages/menu'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
