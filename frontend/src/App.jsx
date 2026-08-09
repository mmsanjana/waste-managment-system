import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import './App.css'; // අලුත් CSS file එක සම්බන්ධ කිරීම

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', margin: '30px 0', fontWeight: '300', letterSpacing: '2px' }}>
          WASTE MANAGEMENT <span style={{ color: '#2ecc71', fontWeight: '600' }}>SYSTEM</span>
        </h1>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;