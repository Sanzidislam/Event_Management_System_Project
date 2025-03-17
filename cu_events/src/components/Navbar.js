import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { fetchUpdateNotifications } from '../services/notificationService';
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsUpdated, setNotificationsUpdated] = useState(false);
  const token = localStorage.getItem('token');
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('token', '');
    console.log(userProfile);
  };

  // Fetch notifications when user logs in or updates
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchUpdateNotifications(token) // Call service function
        .then((response) => {
          console.log(response.notifications);
          // Check if the response is valid and contains 'notifications'
          if (response.status === 201) {
            setNotifications(null); // Set notifications to null if status is 201
          } else if (response.notifications) {
            setNotifications(response.notifications || []); // Safely set the notifications to state
          } else {
            setNotifications([]); // Set to empty array if no notifications are found
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
    if(!token){
      navigate("/login");
      return;
    }
    axios
      .get("http://localhost:5000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        navigate("/login");
      });
  }, [isLoggedIn, token]); // Dependency on isLoggedIn and token

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container">
        <Link 
          className="navbar-brand fw-bold" to="/"
          // style={{color: '#ff7043'}}
          >
          
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
          <div className="d-flex align-items-center">
            {isLoggedIn && (
              <div className="dropdown me-3">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="notificationsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-bell fs-5"></i> {/* Bell icon */}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="notificationsDropdown"
                >
                  {notifications.length > 0 ? (
                    notifications.map((note) => (
                      <li key={note.notification_id} className="dropdown-item">
                        {note.notification_text}
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item text-muted">No notifications</li>
                  )}
                </ul>
              </div>
            )}
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
                  <button 
                    className="btn btn-outline-secondary me-2"
                    style={{color: 'black'}}
                  >
                    {userProfile ? userProfile.name : 'Profile'}
                  </button>
                </Link>
                <Link to="/">
                  <button 
                    className="btn btn-danger"
                    style={{backgroundColor: '#ff7043'}} 
                    onClick={handleLogout}
                  >
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
