import React from "react";

const ToggleButtons = ({ onToggle, showCreatedEvents }) => (
  <div className="mt-5 text-center">
    <button
      className={`btn ${showCreatedEvents ? "btn-primary" : "btn-outline-primary"} me-2`}
      onClick={() => onToggle(true)}
    >
      Events You Created
    </button>
    <button
      className={`btn ${!showCreatedEvents ? "btn-info" : "btn-outline-info"}`}
      onClick={() => onToggle(false)}
    >
      Events You Registered For
    </button>
  </div>
);

export default ToggleButtons;
