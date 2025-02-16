import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations } from '../../services/locationService';
import { getVenues,is_venueAvailable } from '../../services/venueService';
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
  const [isVenueAvailable, setIsVenueAvailable] = useState(false);
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
  // useEffect(() => {
  //   if (eventData.venue_id && eventData.event_date) {
  //     checkVenueAvailability(eventData.venue_id, eventData.event_date);
  //   }
  // }, [eventData.venue_id, eventData.event_date]);

  const handleChange = (e) => setEventData({ ...eventData, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await is_venueAvailable(eventData.venue_id, eventData.event_date);
    console.log(response);

    if (response.message === "Venue is not available on the given date") {
      alert('Venue is not available on the selected date');
      return; // Stop further execution
    }

    if (response.message === "Venue is available") {
      const message = await createEvent(eventData);
      alert(message);
      navigate('/');
    }
  } catch (error) {
    console.error("Error checking venue availability:", error);
    alert('Event creation failed!');
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
