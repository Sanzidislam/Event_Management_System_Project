import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('token', '');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          CU Campus Events
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/show-events">
                  Events
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            {!isLoggedIn ? (
              <Link to="/login">
                <button
                  className="btn btn-danger me-2"
                  style={{ backgroundColor: '#ff7043' }}
                >
                  Login
                </button>
              </Link>
            ) : (
              <>
                <Link to="/profile">
                  <button className="btn btn-outline-secondary me-2">
                    Profile
                  </button>
                </Link>
                <Link to="/">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
