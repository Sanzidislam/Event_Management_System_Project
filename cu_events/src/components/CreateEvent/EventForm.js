import React from 'react';

const EventForm = ({ eventData, handleChange, handleSubmit, children }) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="event_name" className="form-label">Event Name</label>
        <input
          id="event_name"
          name="event_name"
          className="form-control"
          placeholder="Enter event name"
          value={eventData.event_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          placeholder="Enter description"
          rows="3"
          value={eventData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="event_date" className="form-label">Event Date</label>
        <input
          id="event_date"
          type="date"
          name="event_date"
          className="form-control"
          value={eventData.event_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="start_time" className="form-label">Start Time</label>
          <input
            id="start_time"
            type="time"
            name="start_time"
            className="form-control"
            value={eventData.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="end_time" className="form-label">End Time</label>
          <input
            id="end_time"
            type="time"
            name="end_time"
            className="form-control"
            value={eventData.end_time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="max_attendees" className="form-label">Max Attendees</label>
        <input
          id="max_attendees"
          type="number"
          name="max_attendees"
          className="form-control"
          placeholder="Enter max attendees"
          value={eventData.max_attendees}
          onChange={handleChange}
          required
        />
      </div>

      {children}

      <button type="submit" className="btn btn-primary btn-lg w-100">Create Event</button>
    </form>
  );
};

export default EventForm;
