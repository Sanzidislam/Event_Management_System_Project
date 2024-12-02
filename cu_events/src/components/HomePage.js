import React from 'react';
import PropTypes from 'prop-types'; // For prop type validation
import { Link } from 'react-router-dom';
import '../all-css/HomePage.css'; // Import the CSS file

const HomePage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Event Hunt!</h1>
        <p className="hero-subtitle">Your gateway to discovering and hosting amazing events.</p>
      </header>

      <div className="cta-section">
        {!isLoggedIn ? (
          <div className="cta-buttons">
            <p className="cta-text">Log in or sign up to explore events happening right now!</p>
            <Link to="/login">
              <button className="cta-button primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="cta-button secondary">Register</button>
            </Link>
          </div>
        ) : (
          <div className="cta-buttons">
            <p className="cta-text">Explore or create your next unforgettable experience.</p>
            <Link to="/show-events">
              <button className="cta-button primary">Explore Events</button>
            </Link>
            <Link to="/create-event">
              <button className="cta-button secondary">Create Event</button>
            </Link>
          </div>
        )}
      </div>

      <section className="features-section">
        <h2 className="features-title">Why Choose Event Hunt?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon fas fa-calendar-check"></i>
            <h3>Discover Events</h3>
            <p>Find events tailored to your interests, from adventure to tech talks.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon fas fa-pencil-alt"></i>
            <h3>Create Events</h3>
            <p>Host your own events and connect with like-minded people in your area.</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon fas fa-users"></i>
            <h3>Build Connections</h3>
            <p>Network with people who share your passions and expand your horizons.</p>
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
