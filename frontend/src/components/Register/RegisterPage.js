import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    contact_number: '',
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(values); // Call the service
      alert(`Registration successful for ${values.name}!`);
      navigate('/'); // Navigate to the login or home page
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <RegisterForm
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
              <div className="my-5 container text-center">
                Already have an account? <Link to="/login">Login now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
