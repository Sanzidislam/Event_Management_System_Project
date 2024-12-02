import React, { useState } from "react";
import { updateEvent } from "../../services/eventService";
const EditEventModal = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(event.event_id, formData);
      alert("Event updated successfully!");
      onSave();
      onClose();
    } catch (error) {
      alert("Failed to update event.");
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Event</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="event_name" className="form-label">Event Name</label>
                <input
                  id="event_name"
                  name="event_name"
                  className="form-control"
                  value={formData.event_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="event_date" className="form-label">Event Date</label>
                <input
                  id="event_date"
                  type="date"
                  name="event_date"
                  className="form-control"
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">start_time</label>
                <input
                  id="start_time"
                  type="time"
                  name="start_time"
                  className="form-control"
                  value={formData.start_time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">end_time</label>
                <input
                  id="end_time"
                  type="time"
                  name="end_time"
                  className="form-control"
                  value={formData.end_time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn " onClick={onClose}>Close</button>
              <button className="btn " type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;