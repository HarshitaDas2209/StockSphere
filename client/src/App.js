import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// import Navbar from './pages/Navbar';



function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/" element={<Login />} />




      </Routes>
      
    </Router>
  );
}

export default App;
