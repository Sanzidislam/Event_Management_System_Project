import React from "react";

const EventDetailsModal = ({ event, venues, onClose }) => {
  const venue = venues.find((v) => v.venue_id === event.venue_id);

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{event.event_name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {event.start_time}</p>
            <p><strong>End Time:</strong> {event.end_time}</p>
            <p><strong>Venue:</strong> {venue ? venue.venue_name : "Unknown"}</p>
            <p><strong>Location:</strong> {venue ? venue.location_name : "Unknown"}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
