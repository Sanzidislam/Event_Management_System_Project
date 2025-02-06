import React, { useEffect, useState } from "react";
import {
  handleRegisterClick,
  handleUnregisterClick,
  checkRegistrationStatus,
  getRegistrationCount
} from "../../services/eventService";
import { useNavigate } from "react-router-dom";
const EventCard = ({ event, venues, onShowDetails }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const venue = venues.find((v) => v.venue_id === event.venue_id);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      const status = await checkRegistrationStatus(event.event_id);
      setIsRegistered(status);
    };
    fetchRegistrationStatus();
    fetchRegistrationCount();
  }, [event.event_id,isRegistered]);

  const handleToggleRegistration = async () => {
    if (isRegistered) {
      await handleUnregisterClick(event.event_id);
    } else {
      await handleRegisterClick(event.event_id);
    }
    setIsRegistered(!isRegistered);
  };

  const fetchRegistrationCount = async () => {
    try {
      const data = await getRegistrationCount(event.event_id);
      // console.log(data.count);
      setRegistrationCount(data.count);
      setIsFull(data.count >= event.max_attendees); // Check if registration is full
    } catch (error) {
      console.error("Error fetching registration count:", error);
    }
  };
  return (
    <div className="col-sm-3 col-md-3 mb-3">
      <div className="card" style={{ minHeight: "350px" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{event.event_name}</h5>
          <div style={{ fontSize: "0.9rem", textAlign: "left" }}>
            <p>
              <strong>Description:</strong> {event.description.length > 15 ? event.description.substr(0, 15) + '...' : event.description}
            </p>
            <p className="card-text">
              <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Venue:</strong> {venue ? venue.venue_name : "Unknown"}
            </p>
            <p>
              <strong>Location:</strong> {venue ? venue.location_name : "Unknown"}
            </p>
            <p>
              <strong>Registered:</strong> {registrationCount} / {event.max_attendees}
            </p>
          </div>
          <button
            className="btn btn-info me-2"
            onClick={() => onShowDetails(event)}
          >
            Show Details
          </button>
          <button
            className={`btn ${isRegistered ? "btn-danger" : "btn-success"}`}
            disabled={!isRegistered && isFull} // Disable if the event is full
            onClick={() => {
              if (isRegistered) {
                handleToggleRegistration(); // Allow user to unregister
              } else if (!isFull) {
                handleToggleRegistration(); // Allow registration if not full
              } else {
                alert("Event is full!"); // Show alert for new users when event is full
              }
            }}
          >
            {isRegistered ? "Unregister" : isFull ? "Full" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
