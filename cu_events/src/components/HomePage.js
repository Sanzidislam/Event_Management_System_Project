import React from 'react';
import PropTypes from 'prop-types'; // For prop type validation
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = ({ isLoggedIn, setIsLoggedIn } ) => {
  console.log("HomePage is rendering. isLoggedIn:", isLoggedIn);

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to Event Hunt!</h1>
      <p>Your gateway to finding the Event you want.</p>

      {/* Conditional rendering logic */}
      {!isLoggedIn ? (
        <div>
          <p>Please log in to explore events happening right now.</p>
          <Link to="/login">
            <button className="btn btn-primary btn-lg">Login</button>
          </Link>
          <p className="mt-3">Not registered yet?</p>
          <Link to="/register">
            <button className="btn btn-outline-secondary btn-lg">Register</button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Browse available events now!</p>
          <Link to="/show-events">
            <button className="btn btn-success btn-lg me-3">Explore Events</button>
          </Link>
          <Link to="/create-event">
            <button className="btn btn-warning btn-lg">Create Event</button>
          </Link>
          {/* <h1>{localStorage.getItem("token")}</h1> */}
        </div>
      )}

      {/* Features Section */}
      <section className="features-section container mt-5 text-center">
        <h2 className="mb-4">Why Choose Event Hunt?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-calendar-check feature-icon"></i>
              <h4>Discover Events</h4>
              <p>Find events tailored to your interests, from adventure to tech talks.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-pencil-alt feature-icon"></i>
              <h4>Create Events</h4>
              <p>Host your own events and connect with like-minded people in your area.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-users feature-icon"></i>
              <h4>Build Connections</h4>
              <p>Network with people who share your passions and expand your horizons.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// Prop type validation
HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HomePage;
