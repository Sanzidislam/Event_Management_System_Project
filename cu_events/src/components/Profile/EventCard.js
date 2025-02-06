import React, { useEffect, useState } from "react";
import { getRegistrationCount } from "../../services/eventService";
import { getAverageRating } from "../../services/reviewService";
const EventCard = ({
  event,
  venues,
  onShowDetails,
  onEdit,
  onDelete,
  onShowRegisteredUsers,
  onShowReviews,
}) => {
  const venue = venues.find((v) => v.venue_id === event.venue_id);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
      const fetchAverageRating = async () => {
        const averageRatingData = await getAverageRating(event.event_id);
        setAverageRating(averageRatingData);
      };
      fetchAverageRating();
    fetchRegistrationCount();
  }, [event.event_id]);

  const fetchRegistrationCount = async () => {
    try {
      const data = await getRegistrationCount(event.event_id);
      setRegistrationCount(data.count);
    } catch (error) {
      console.error("Error fetching registration count:", error);
    }
  };

  // Check if the event has passed
  const isPastEvent = new Date(event.event_date) < new Date();

  return (
    <div className="col-sm-3 col-md-3 mb-3">
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
          {isPastEvent ? (
            averageRating ? (
              <p className="mt-2">
                <strong>Average Rating:</strong> {isNaN(averageRating) ? 'N/A' : parseFloat(averageRating).toFixed(2)}/5
              </p>
            ) : <p className="mt-2">No reviews yet.</p>
          ) : null}

          <button
            className="btn btn-info me-2"
            onClick={() => onShowDetails(event)}
          >
            Show Details
          </button>
          {isPastEvent ? (
            <button
              className="btn btn-primary"
              onClick={() => onShowReviews(event.event_id)}
            >
              Show Reviews
            </button>
            
          ) : (
            <>
              <button
                className="btn btn-warning me-2"
                onClick={() => onEdit(event)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={() => onDelete(event.event_id)}
              >
                Delete
              </button>
              <button
                className="btn btn-info my-2"
                onClick={() => onShowRegisteredUsers(event.event_id)}
              >
                See Registered Users
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
