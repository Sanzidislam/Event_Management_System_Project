import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold selected event details
  const [editEvent, setEditEvent] = useState(null); // State for editing an event

  useEffect(() => {
    fetchEvents();
    fetchVenues();
  }, []);

  const fetchEvents = () => {
    axios
      .get('http://localhost:5000/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  };

  const fetchVenues = () => {
    axios
      .get('http://localhost:5000/venues')
      .then((response) => setVenues(response.data))
      .catch((error) => console.error('Error fetching venues:', error));
  };

  const handleShowDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/events/delete/${eventId}`);
        alert('Event deleted successfully!');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.');
      }
    }
  };

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/events/update/${editEvent.event_id}`, editEvent);
      alert('Event updated successfully!');
      setEditEvent(null);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event.');
    }
  };

    // Helper function to get the location name by ID
  const getLocationName = (id) => {
    // const location = locations.find((loc) => loc.venue_id === id);
    // return location ? location.location_name : 'Unknown location';
    const venue = venues.find((ven) => ven.venue_id === id);
    console.log(venues);
    return venue ? venue.location_name : 'Unknown Venue';
  };
  const getVenueName = (id) => {
    const venue = venues.find((ven) => ven.venue_id === id);
    return venue ? venue.venue_name : 'Unknown Venue';
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Events</h1>
      {events.length === 0 ? (
  <h2 className="text-center mt-5">There are no events to show</h2>
): ''};
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.event_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{event.event_name}</h5>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                </p>
                <button className="btn btn-info me-2" onClick={() => handleShowDetails(event)}>
                  Show Details
                </button>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(event)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(event.event_id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show details modal */}
      {selectedEvent && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedEvent.event_name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseDetails}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Description:</strong> {selectedEvent.description}</p>
                <p><strong>Date:</strong> {new Date(selectedEvent.event_date).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {selectedEvent.start_time}</p>
                <p><strong>End Time:</strong> {selectedEvent.end_time}</p>
                <p><strong>Max Attendees:</strong> {selectedEvent.max_attendees}</p>
                <p><strong>Location:</strong> {getLocationName(selectedEvent.venue_id)}</p>
                <p><strong>Venue:</strong> {getVenueName(selectedEvent.venue_id)}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Edit event form */}
      {editEvent && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditEvent(null)}
                ></button>
              </div>
              <form onSubmit={handleEditSubmit} className="modal-body">
                <div className="mb-3">
                  <label htmlFor="event_name" className="form-label">Event Name</label>
                  <input
                    id="event_name"
                    name="event_name"
                    className="form-control"
                    value={editEvent.event_name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={editEvent.description}
                    onChange={handleEditChange}
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
                    value={editEvent.event_date}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditEvent(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEvents;
