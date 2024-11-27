import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token); // Save token for authenticated sessions
      alert("Login Successful!");
      setIsLoggedIn(true);

      // Redirect to the profile page
      navigate("/profile");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
    </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="my-5 container text-center">
            Do not have an account? <Link to="/register">Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
