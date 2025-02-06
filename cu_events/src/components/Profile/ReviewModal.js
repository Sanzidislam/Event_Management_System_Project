import React, { useState } from "react";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onSubmit({ reviewText, rating });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Leave a Review</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? "on" : "off"}
                onClick={() => setRating(index)}
              >
                <span className="star">★</span>
              </button>
            );
          })}
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit Review
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;