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
          <h5 className="modal-title">Registered Users</h5>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {state === 201 ? (
            <p className="text-center text-muted">
              No users have registered for this event yet.
            </p>
          ) : (
            <ul className="list-group">
              {users.map((user, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={user.profile_picture
                        ? `http://localhost:5000/${user.profile_picture}` // Construct full URL
                        : "https://via.placeholder.com/150"} // Fallback image
                      alt={user.name}
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <span>
                      {index + 1}. {user.name}
                    </span>
                  </div>
                  <span className="text-muted">{user.email}</span>
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
