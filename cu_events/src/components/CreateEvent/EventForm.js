import React from 'react';
import '../../all-css/EventForm.css'; // Import the CSS file

const EventForm = ({ eventData, handleChange, handleSubmit, children,isVenueAvailable }) => {
  return (
    <form onSubmit={handleSubmit} className="event-form p-3 border rounded shadow-sm" style={{background: "#f7f0eb"}}>
      <div className="mb-2">
        <label htmlFor="event_name" className="form-label">Event Name</label> 
        <input
          id="event_name"
          name="event_name"
          className="form-control form-control-sm"
          placeholder="Enter event name"
          value={eventData.event_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control form-control-sm"
          placeholder="Enter description"
          rows="2"
          value={eventData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-2">
        <label htmlFor="event_date" className="form-label">Date & Time</label>
        <div className="d-flex gap-2">
          <input
            id="event_date"
            type="date"
            name="event_date"
            className="form-control form-control-sm"
            value={eventData.event_date}
            onChange={handleChange}
            required
          />
          <input
            id="start_time"
            type="time"
            name="start_time"
            className="form-control form-control-sm"
            value={eventData.start_time}
            onChange={handleChange}
            required
          />
          <input
            id="end_time"
            type="time"
            name="end_time"
            className="form-control form-control-sm"
            value={eventData.end_time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-2">
        <label htmlFor="max_attendees" className="form-label">Max Attendees</label>
        <input
          id="max_attendees"
          type="number"
          name="max_attendees"
          className="form-control form-control-sm"
          placeholder="Enter max attendees"
          value={eventData.max_attendees}
          onChange={handleChange}
          required
        />
      </div>

      {children}
      {/* {!isVenueAvailable && <p className="text-danger small">Venue is already booked on this date.</p>} */}

      <button type="submit" className="btn btn-primary btn-sm w-100">Create Event</button>
    </form>
  );

};

export default EventForm;
