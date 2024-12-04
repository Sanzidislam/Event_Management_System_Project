import React from "react";

const ShowRegisteredUsersModal = ({ users, onClose, state }) => {
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
                    <span>
                      {index + 1}. {user.name}
                    </span>
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
