import React, { useEffect, useState } from "react";
import {
  handleRegisterClick,
  handleUnregisterClick,
  checkRegistrationStatus,
  getRegistrationCount
} from "../../services/eventService";
import{
  getUserReview,
  getAverageRating
} from "../../services/reviewService";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const EventCard = ({ event, venues, onShowDetails,token}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [userReviewStatus, setUserReviewStatus] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const venue = venues.find((v) => v.venue_id === event.venue_id);
  const navigate = useNavigate();
  console.log(event);
  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      const status = await checkRegistrationStatus(event.event_id);
      setIsRegistered(status);
    };
    const fetchRegistrationCount = async () => {
      try {
        const data = await getRegistrationCount(event.event_id);
        setRegistrationCount(data.count);
        setIsFull(data.count >= event.max_attendees); // Check if registration is full
      } catch (error) {
        console.error("Error fetching registration count:", error);
      }
    };
    const fetchReviewData = async () => {
      try {
        const userReviewData = await getUserReview(event.event_id,token);
        const averageRatingData = await getAverageRating(event.event_id);
        if(userReviewData.status!=201){
        setUserReview(userReviewData.data);
        setUserReviewStatus(true)
        // console.log(userReviewData);
      }
        else setUserReviewStatus(false);
        setAverageRating(averageRatingData);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchRegistrationStatus();
    fetchRegistrationCount();
    if (new Date(event.event_date) < new Date()) {
      fetchReviewData(); // Fetch review data if the event is past
    }
  }, [event.event_id, event.event_date]);

  const handleToggleRegistration = async () => {
    if (isRegistered) {
      await handleUnregisterClick(event.event_id);
    } else {
      await handleRegisterClick(event.event_id);
    }
    setIsRegistered(!isRegistered);
  };

  const handleReviewSubmit = async () => {
    setIsSubmitting(true);
    const review = {
      review_text: reviewText,
      rating: rating,
      user_id: event.user_id
    }
    try {
      await axios.post(`http://localhost:5000/reviews/${event.event_id}/review`, review,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Review submitted successfully!");
      setReviewText("");
      setRating(0);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
      setIsSubmitting(false);
    }
  };

  const isPastEvent = new Date(event.event_date) < new Date();

  return (
    <div className="col-md-4 mb-4">
      {/* <h1>Hello</h1> */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{event.event_name}</h5>
          <p>{event.description.substr(0, 30) + "..."}</p>
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

          {/* Show Details Button */}
          <button
            className="btn btn-info me-2"
            onClick={() => onShowDetails(event)}
          >
            Show Details
          </button>

          {/* Register / Unregister Button */}
          {!isPastEvent && (
            <button
              className={`btn ${isRegistered ? "btn-danger" : "btn-success"}`}
              disabled={isFull} // Disable if the event is full
              onClick={() => {
                if (!isFull) {
                  handleToggleRegistration(); // Toggle between Register and Unregister
                } else {
                  alert("Event is full!");
                }
              }}
            >
              {isFull ? "Full" : isRegistered ? "Unregister" : "Register"}
            </button>
          )}

          {/* Review Section for Past Events */}
          {isPastEvent && (
            <div className="mt-3">
              <h6>Your Review:</h6>
              {userReviewStatus ? (
                <div>
                  <p><strong>Review:</strong> {userReview.review_text}</p>
                  <p><strong>Rating:</strong> {userReview.rating}/5</p>
                </div>
              ) : (
                <div>
                  <textarea
                    className="form-control mb-2"
                    placeholder="Write your review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <select
                    className="form-select mb-2"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    disabled={isSubmitting}
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={handleReviewSubmit}
                    disabled={isSubmitting || !reviewText || !rating}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              )}

              {/* Average Rating */}
              <p className="mt-2">
                <strong>Average Rating:</strong> {averageRating}/5
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
