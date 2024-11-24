import React from "react";

const EventCard = ({ event, onEdit, onDelete, showActions = false }) => (
  <div className="card shadow">
    <div className="card-body">
      <h5 className="card-title">{event.event_name}</h5>
      <p className="card-text">
        <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
      </p>
      <p className="card-text">
        <strong>Venue:</strong> {event.venue_name}
      </p>
      {showActions && (
        <>
          <button className="btn btn-primary me-2" onClick={() => onEdit(event.event_id)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(event.event_id)}>
            Delete
          </button>
        </>
      )}
    </div>
  </div>
);

export default EventCard;
