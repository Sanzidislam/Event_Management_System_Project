import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations } from '../../services/locationService';
import { getVenues } from '../../services/venueService';
import { getCategories } from '../../services/categoryService';
import { createEvent } from '../../services/eventService';
import EventForm from './EventForm';
import VenueSelect from './VenueSelect';
import LocationSelect from './LocationSelect';
import CategorySelect from './CategorySelect';
import axios from 'axios';
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    event_name: '',
    description: '',
    event_date: '',
    start_time: '',
    end_time: '',
    max_attendees: '',
    location_id: '',
    venue_id: '',
    category_id: '',
    user_id: 1, // Temporary user ID
  });

  const [venues, setVenues] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [isVenueAvailable, setIsVenueAvailable] = useState(true);
  useEffect(() => {
    getLocations().then(setLocations).catch(console.error);
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (eventData.location_id) {
      getVenues(eventData.location_id).then(setVenues).catch(console.error);
    } else {
      setVenues([]);
    }
  }, [eventData.location_id]);
  useEffect(() => {
    if (eventData.venue_id && eventData.event_date) {
      checkVenueAvailability(eventData.venue_id, eventData.event_date);
    }
  }, [eventData.venue_id, eventData.event_date]);

  const handleChange = (e) => setEventData({ ...eventData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await createEvent(eventData);
      alert(message);
      navigate('/');
    } catch {
      alert('Event creation failed!');
    }
  };
    const checkVenueAvailability = async (venueId, eventDate) => {
    try {
      const response = await axios.post("http://localhost:5000/check-venue", {
        venue_id: venueId,
        event_date: eventDate,
      });
  
      setIsVenueAvailable(response.data.isAvailable);
    } catch (error) {
      console.error("Error checking venue availability:", error);
      setIsVenueAvailable(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Event</h2>
      <EventForm eventData={eventData} handleChange={handleChange} handleSubmit={handleSubmit} isVenueAvailable={isVenueAvailable}>
        <LocationSelect
          locations={locations}
          handleChange={handleChange}
          selectedLocation={eventData.location_id}
        />
        <VenueSelect
          venues={venues}
          handleChange={handleChange}
          selectedVenue={eventData.venue_id}
        />
        <CategorySelect
          categories={categories}
          handleChange={handleChange}
          selectedCategory={eventData.category_id}

        />
      </EventForm>
    </div>
  );
};

export default CreateEvent;
