import React from "react";
import { handleRegisterClick } from "../../services/eventService";



const EventCard = ({ event, venues, onShowDetails }) => {
  const venue = venues.find((v) => v.venue_id === event.venue_id);

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
            className="btn btn-success"
            onClick={() => handleRegisterClick(event.event_id)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
