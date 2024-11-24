// profile.js (React)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showCreatedEvents, setShowCreatedEvents] = useState(true); // State to toggle between Created and Registered events
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    // Fetch user profile
    axios
      .get("http://localhost:5000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserProfile(response.data);
        fetchCreatedEvents(response.data.user_id);
        fetchRegisteredEvents(response.data.user_id);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        navigate("/login");
      });
  }, [navigate]);

  const fetchCreatedEvents = (userId) => {
    axios
      .get(`http://localhost:5000/events/${userId}`)
      .then((response) => setCreatedEvents(response.data))
      .catch((error) => console.error("Error fetching created events:", error));
  };

  const fetchRegisteredEvents = (userId) => {
    axios
      .get(`http://localhost:5000/events/registered/${userId}`)
      .then((response) => setRegisteredEvents(response.data))
      .catch((error) => console.error("Error fetching registered events:", error));
  };

  const handleDeleteEvent = (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:5000/events/${eventId}`)
      .then(() => {
        alert("Event deleted successfully!");
        setCreatedEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  const handleEditEvent = (eventId) => {
    navigate(`/events/${eventId}`); // Redirect to an edit page for the event
  };

  const handleCreateButton = ()=>{
    navigate('/CreateEvent');
  }

  if (!userProfile) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div className="container mt-5">
      {/* {ShowEvents()} */}
      {/* Profile Card */}
      <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h1 className="card-title text-center text-primary mb-4">Profile</h1>
          <p className="card-text">
            <strong>User ID:</strong> {userProfile.user_id}
          </p>
          <p className="card-text">
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p className="card-text">
            <strong>Contact Number:</strong> {userProfile.contact_number}
          </p>
          {userProfile.otherDetails && (
            <div className="mt-3">
              <h5 className="text-secondary">Other Details</h5>
              <p className="card-text">
                <strong>Phone:</strong> {userProfile.otherDetails.phone}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {userProfile.otherDetails.address}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="mt-5 text-center">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setShowCreatedEvents(true)}
        >
          Events You Created
        </button>
        <button
          className="btn btn-outline-info"
          onClick={() => setShowCreatedEvents(false)}
        >
          Events You Registered For
        </button>
      </div>

      {/* Created Events Section */}
      {showCreatedEvents ? (
        <div className="mt-5">
          <h2 className="text-center text-success">Events You Created</h2>
          {createdEvents.length > 0 ? (
            <div className="row mt-4">
              {createdEvents.map((event) => (
                <div className="col-md-4 mb-4" key={event.event_id}>
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">{event.event_name}</h5>
                      <p className="card-text">
                        <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Venue:</strong> {event.venue_name}
                      </p>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEditEvent(event.event_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteEvent(event.event_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (<div div className = "text-center">
            <h4 className="text-center text-muted">You haven't creted any events</h4>
            <Link to="/create-event">
            <button className="btn btn-success btn-lg my-5">Create Event</button>
            </Link>
          </div>
          )}
        </div>
      ) : (
        // Registered Events Section
        <div className="mt-5">
          <h2 className="text-center text-info">Events You Registered For</h2>
          {registeredEvents.length > 0 ? (
            <div className="row mt-4">
              {registeredEvents.map((event) => (
                <div className="col-md-4 mb-4" key={event.event_id}>
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">{event.event_name}</h5>
                      <p className="card-text">
                        <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Venue:</strong> {event.venue_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h4 className="text-center text-muted">You haven't registered for any events</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
