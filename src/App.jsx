import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import BirthCertificate from '../container/page1/BirthCertificate';
import DeathCertificate from '../container/page3/DeathCertificate';
import MarriageCertificate from '../container/page2/MarriageCertificate';
import Press from '../container/asset/Press';
import Header from '../container/components/Header';


function Home() {
  return (
    <div id="Main">
      <Header />
      <div className='header'><h1>Your Digital Space</h1></div>
      <div className="container">

        <div className="box-container">
          <Link to="/birthcertificate" className="box">
            <Press Ctype="BC" />
          </Link>
          <Link to="/marriagecertificate" className="box">
            <Press Ctype="MC" />
          </Link>
          <Link to="/deathcertificate" className="box">
            <Press Ctype="DC" />
          </Link>
        </div>
      </div>
    </div>

  );
}



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/birthcertificate" element={<BirthCertificate />} />
        <Route path="/marriagecertificate" element={<MarriageCertificate />} />
        <Route path="/deathcertificate" element={<DeathCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
