import React from "react";
import { useState } from "react";
const ShowRegisteredUsersModal = ({ users, onClose, state }) => {
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    users.profile_picture
      ? `http://localhost:5000/${users.profile_picture}` // Construct full URL
      : "https://via.placeholder.com/150"
  );
  console.log(users);
  return (
    <div
    className="modal show d-flex align-items-center justify-content-center"
    tabIndex="-1"
    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content shadow-lg rounded-3">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">Event Reviews</h5>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {state === 201 ? (
            <p className="text-center text-muted">
              No Reviws yet!!!!!!!
            </p>
          ) : (
            <ul className="list-group">
  {users.map((user, index) => (
    <li
      key={index}
      className="list-group-item d-flex flex-column align-items-start"
      style={{ gap: "0.5rem" }}
    >
      <div className="d-flex align-items-center mb-2">
        <img
          src={
            user.profile_picture
              ? `http://localhost:5000/${user.profile_picture}` // Construct full URL
              : "https://via.placeholder.com/150" // Fallback image
          }
          alt={user.name}
          className="rounded-circle me-3"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
        />
        <div>
          <strong>{index + 1}. {user.name}</strong>
          <br />
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>
            {user.email}
          </span>
        </div>
      </div>
      <div className="mb-1">
        <strong>Rating:</strong> <span className="text-muted">{user.rating} / 5</span>
      </div>
      <div>
        <strong>Review:</strong>
        <p className="mb-0 text-muted" style={{ fontSize: "0.95rem" }}>
          {user.review_text}
        </p>
      </div>
    </li>
  ))}
</ul>

          )}
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

export default ShowRegisteredUsersModal;
