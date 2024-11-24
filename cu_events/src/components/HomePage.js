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
            <button className="btn btn-success btn-lg">Explore Events</button>
          </Link>
          <Link to="/create-event">
            <button className="btn btn-success btn-lg">Create Event</button>
          </Link>
          {/* <h1>{localStorage.getItem("token")}</h1> */}
        </div>
      )}
    </div>
  );
};

// Prop type validation
HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HomePage;
