import React, { useState, useEffect } from "react";
import { updateEvent } from "../../services/eventService";
import LocationSelect from "../CreateEvent/LocationSelect";
import VenueSelect from "../CreateEvent/VenueSelect";
import { getLocations } from '../../services/locationService';
import { getVenues, fetchVenues } from '../../services/venueService';

const EditEventModal = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    ...event,
    event_date: event.event_date ? event.event_date.split("T")[0] : "",
  });
  // console.log(event);
  const [locations, setLocations] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isVenueAvailable, setIsVenueAvailable] = useState(true);
  const [vanue_n_location, setVanue_n_location] = useState([]);
  useEffect(() => {
    getLocations().then(setLocations).catch(console.error);
    fetchVenues().then(data => {
      setVanue_n_location(data);
      // Set initial location_id based on event's venue_id
      const currentVenue = data.find(v => v.venue_id === event.venue_id);
      if (currentVenue) {
        setFormData(prev => ({
          ...prev,
          location_id: currentVenue.location_id,
        }));
      }
    }).catch(console.error);
  }, []);

  useEffect(() => {
    if (formData.location_id) {
      getVenues(formData.location_id).then(setVenues).catch(console.error);
    } else {
      setVenues([]);
    }
  }, [formData.location_id]);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData(prev => ({ ...prev, [name]: value }));
    // if (name === "location_id") {
    //   getVenues(value).then(setVenues).catch(console.error);
    // }
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
                <label htmlFor="start_time" className="form-label">Start Time</label>
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
                <label htmlFor="end_time" className="form-label">End Time</label>
                <input
                  id="end_time"
                  type="time"
                  name="end_time"
                  className="form-control"
                  value={formData.end_time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="max_attendees" className="form-label">Max Attendees</label>
                <input
                  id="max_attendees"
                  type="number"
                  name="max_attendees"
                  className="form-control"
                  value={formData.max_attendees}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location_id" className="form-label">Location</label>
                <LocationSelect
                  // id="location_id"
                  // name="location_id"
                  // value={formData.location_id}
                  locations={locations}
                  onChange={handleChange}
                  selectedLocation={formData.location_id}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="venue_id" className="form-label">Venue</label>
                <VenueSelect
                  id="venue_id"
                  name="venue_id"
                  // value={formData.venue_id}
                  onChange={handleChange}
                  venues={venues}
                  selectedVenue={formData.venue_id}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;