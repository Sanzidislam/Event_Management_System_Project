import React, { useEffect, useState } from "react";
import {
  handleRegisterClick,
  handleUnregisterClick,
  checkRegistrationStatus,
} from "../../services/eventService";

const EventCard = ({ event, venues, onShowDetails }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const venue = venues.find((v) => v.venue_id === event.venue_id);

  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      const status = await checkRegistrationStatus(event.event_id);
      setIsRegistered(status);
    };
    fetchRegistrationStatus();
  }, [event.event_id]);

  const handleToggleRegistration = async () => {
    if (isRegistered) {
      await handleUnregisterClick(event.event_id);
    } else {
      await handleRegisterClick(event.event_id);
    }
    setIsRegistered(!isRegistered);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{event.event_name}</h5>
          <p className="card-text">
            <strong>Date:</strong>{" "}
            {new Date(event.event_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Venue:</strong> {venue ? venue.venue_name : "Unknown"}
          </p>
          <button
            className="btn btn-info me-2"
            onClick={() => onShowDetails(event)}
          >
            Show Details
          </button>
          <button
            className={`btn ${isRegistered ? "btn-danger" : "btn-success"}`}
            onClick={handleToggleRegistration}
          >
            {isRegistered ? "Unregister" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
