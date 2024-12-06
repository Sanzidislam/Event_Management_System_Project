import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    contact_number: ''
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .post('http://localhost:5000/auth/register', values)
    .then((res) => {
      console.log("Registered successfully");
      alert(`Registration successful for ${values.name}!`);
      navigate('/'); // Navigate after successful registration
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        if (err.response.status === 400) {
          alert("Email is already registered. Please try a different one.");
        } else {
          alert(`Registration failed: ${err.response.data || "Unexpected error"}`);
        }
      }
    })
    ;
  
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your name" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact_number" className="form-label">Contact Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="contact_number" 
                    name="contact_number" 
                    placeholder="Enter your contact number" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className='my-5 container text-center'>
              Already have an account? <Link to="/login" style={{color: "#ff7e5f"}}>Login now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
);
};

export default Register;
