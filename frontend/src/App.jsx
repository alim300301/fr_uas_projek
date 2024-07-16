import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TambahBarang from './components/TambahBarang';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Toko Bangunan</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="TambahBarang" element={<TambahBarang />} />
        </Routes>
        Ro
      </div>
    </Router>
  );
};

export default App;
