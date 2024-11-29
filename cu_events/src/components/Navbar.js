import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('token','');
  };

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">CU Campus Events</Link>
  <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      {isLoggedIn && (
        <li className="nav-item">
          <Link className="nav-link" to="/show-events">Events</Link>
        </li>
      )}
    </ul>
    <div className="d-flex align-items-center">
      {!isLoggedIn ? (
        <Link to="/login">
          <button className="btn btn-outline-primary mr-2">Login</button>
        </Link>
      ) : (
        <>
          <Link to="/profile">
            <button className="btn btn-outline-secondary mr-2">Profile</button>
          </Link>
          <Link to = "/">
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </Link>
        </>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;
