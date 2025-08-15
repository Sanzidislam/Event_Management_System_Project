import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { login } from '../../services/authService';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password); // Call the auth service
      localStorage.setItem('token', data.token); // Save the token
      alert('Login Successful!');
      setIsLoggedIn(true);
      navigate('/'); // Redirect to home
    } catch (error) {
      alert('Invalid credentials');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
          <div className="my-5 container text-center">
            Don't have an account? <Link to="/register">Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
