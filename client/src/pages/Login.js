



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://nodebackend-2ueq.onrender.com/api/auth/login', form);
      // const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('manager', JSON.stringify(res.data.manager));
      navigate('/dashboard'); // we'll build this next
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input 
                    name="password" 
                    placeholder="Password" 
                    type="password" 
                    onChange={handleChange} 
                    required 
                    className="form-control"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className="text-center mt-3">
                  Don't have an account? <Link to="/register">Register here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;