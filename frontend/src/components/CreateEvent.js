import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    event_name: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    max_attendees: '',
    location_id: '', // Selected location
    venue_id: '', // Selected venue for the location
    category_id: '', // Selected event category
    user_id: '' // temporary user ID
  });

  const [locations, setLocations] = useState([]);
  const [venues, setVenues] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();   
  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Fetch venues whenever a location is selected
  useEffect(() => {
    if (eventData.location_id) {
      const fetchVenues = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/venues/${eventData.location_id}`);
          setVenues(response.data);
        } catch (error) {
          console.error('Error fetching venues:', error);
        }
      };

      fetchVenues();
    } else {
      setVenues([]); // Clear venues if no location is selected
    }
  }, [eventData.location_id]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories(); 
  }, []);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/events/create', eventData, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data); // Success message from the backend
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Event creation failed!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="event_name" className="form-label">Event Name</label>
          <input
            id="event_name"
            name="event_name"
            className="form-control"
            placeholder="Enter event name"
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
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location_id" className="form-label">Location</label>
          <select
            id="location_id"
            name="location_id"
            className="form-select"
            onChange={handleChange}
            value={eventData.location_id}
            required
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.location_id} value={location.location_id}>
                {location.location_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="venue_id" className="form-label">Venue</label>
          <select
            id="venue_id"
            name="venue_id"
            className="form-select"
            onChange={handleChange}
            value={eventData.venue_id}
            required
          >
            <option value="">Select Venue</option>
            {venues.map((venue) => (
              <option key={venue.venue_id} value={venue.venue_id}>
                {venue.venue_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">Category</label>
          <select
            id="category_id"
            name="category_id"
            className="form-select"
            onChange={handleChange}
            value={eventData.category_id}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
