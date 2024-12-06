import React, { useEffect, useState } from "react";
import { getRegistrationCount } from "../../services/eventService";
const EventCard = ({ event, venues, onShowDetails, onEdit, onDelete, onShowRegisteredUsers }) => {
  const venue = venues.find((v) => v.venue_id === event.venue_id);
  const [registrationCount, setRegistrationCount] = useState(0);
  useEffect(()=>{
    fetchRegistrationCount();
  },[event.event_id]);  
  const fetchRegistrationCount = async () => {
    try {
      const data = await getRegistrationCount(event.event_id);
      // console.log(data.count);
      setRegistrationCount(data.count);
      } catch (error) {
      console.error("Error fetching registration count:", error);
    }
  };

  // console.log(event);
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
          <p>
            <strong>Registered:</strong> {registrationCount} / {event.max_attendees}
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
          
          <button
            className="btn btn-info"
            onClick={() => onShowRegisteredUsers(event.event_id)}
          >
          See Registered Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
