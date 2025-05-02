









import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    warehouseName: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://nodebackend-2ueq.onrender.com/api/auth/register', form);
      // await axios.post('http://localhost:5000/api/auth/register', form);

      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input 
                    name="name" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    required 
                    className="form-control"
                  />
                </div>
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
                <div className="mb-3">
                  <input 
                    name="warehouseName" 
                    placeholder="Warehouse Name" 
                    onChange={handleChange} 
                    required 
                    className="form-control"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
                <div className="text-center mt-3">
                  Already have an account? <Link to="/login">Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;