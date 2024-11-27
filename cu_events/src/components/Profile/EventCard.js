import React from "react";

const EventCard = ({ event, venues, onShowDetails, onEdit, onDelete }) => {
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
            className="btn btn-warning me-2"
            onClick={() => onEdit(event)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(event.event_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
