import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';
import '../all-css/HomePage.css';

const HomePage = ({ isLoggedIn }) => {
  const [popularLocations, setPopularLocations] = useState([]);
  const [topCreators, setTopCreators] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchPopularLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/locations/popularLocations');
        if (response.status === 200) setPopularLocations(response.data);
      } catch (error) {
        console.error('Error fetching popular locations:', error.message);
      }
    };

    const fetchTopCreators = async () => {
      try {
        const response = await axios.get('http://localhost:5000/topList/getTopCreators');
        if (response.status === 200) setTopCreators(response.data);
      } catch (error) {
        console.error('Error fetching top creators:', error.message);
      }
    };

    fetchPopularLocations();
    fetchTopCreators();
  }, []);

  return (
    <div className="homepage-container text-center">
      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Event Hunt!</h1>
        <p className="hero-subtitle">Your gateway to discovering and hosting amazing events.</p>
      </header>

      {/* CTA Section */}
      <div className="cta-section">
        {!isLoggedIn ? (
          <div className="cta-buttons">
            <p className="cta-text">Log in or sign up to explore events happening right now!</p>
            <Link to="/login"><button className="cta-button primary">Login</button></Link>
            <Link to="/register"><button className="cta-button secondary">Register</button></Link>
          </div>
        ) : (
          <div className="cta-buttons">
            <p className="cta-text">Explore or create your next unforgettable experience.</p>
            <Link to="/show-events"><button className="cta-button primary">Explore Events</button></Link>
            <Link to="/create-event"><button className="cta-button secondary">Create Event</button></Link>
          </div>
        )}
      </div>

      {/* Top Creators Section */}
      <section className="top-creators-section">
        <h2 className="section-title">Top Event Creators</h2>
        <div className="creators-grid">
          {topCreators.length > 0 ? (
            topCreators.map((creator) => (
              <div key={creator.user_id} className="creator-card">
                <img
                  src={`http://localhost:5000/${creator.profile_picture}`}
                  alt={creator.name}
                  className="creator-profile-pic"
                />
                <div className="creator-name">{creator.name}</div>
                <div className="creator-events">{creator.count_events} events created</div>
              </div>
            ))
          ) : (
            <p className="no-creators-message">No top creators to display at the moment.</p>
          )}
        </div>
      </section>

      {/* Popular Locations Section */}
      <section className="popular-locations-section">
        <h2 className="section-title">Most Popular Locations</h2>
        <div className="locations-grid">
          {popularLocations.length > 0 ? (
            popularLocations.map((location) => (
              <div key={location.location_id} className="location-card">
                <h3>{location.location_name}</h3>
                <p>{location.total_events} events hosted here</p>
              </div>
            ))
          ) : (
            <p className="no-locations-message">No popular locations to display at the moment.</p>
          )}
        </div>
      </section>

      <br />
      <Footer />
    </div>
  );
};

// Prop type validation
HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HomePage;
