import React, { useState, useEffect } from "react";
import { fetchEvents } from "../../services/eventService";
import { fetchVenues } from "../../services/venueService";
import EventCard from "./EventCard";
import EventDetailsModal from "./EventDetailsModal";
import LocationSelect from "../CreateEvent/LocationSelect";
import CategorySelect from "../CreateEvent/CategorySelect";
import { getLocations } from "../../services/locationService";
import { getCategories } from "../../services/categoryService";
import "../../all-css/ShowEvents.css";
import { Link } from "react-router-dom";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    loadEvents();
    loadVenues();
    loadLocations();
    loadCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedLocation, selectedCategory, selectedDate, events]);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const loadVenues = async () => {
    try {
      const data = await fetchVenues();
      setVenues(data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const loadLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const applyFilters = () => {
    let filtered = events;

    if (selectedLocation) {
      filtered = filtered.filter((event) => event.location_id == selectedLocation);
    }

    if (selectedCategory) {
      filtered = filtered.filter((event) => event.category_id == selectedCategory);
    }

    if (selectedDate) {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.event_date).toLocaleDateString();
        return eventDate === new Date(selectedDate).toLocaleDateString();
      });
    }

    setFilteredEvents(filtered);
  };

  const resetFilters = () => {
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedDate("");
  };

  return (
    <div className="show-events-container">
      <div className="sidebar">
        {/* <button className="btn btn-primary mb-3">+ Create Event</button> */}
        <Link to= "/create-event" className="btn btn-primary mb-3">+ Create Event</Link>
        <h4>Filters</h4>
        <LocationSelect
          locations={locations}
          handleChange={(e) => setSelectedLocation(e.target.value)}
          selectedLocation={selectedLocation}
        />
        <CategorySelect
          categories={categories}
          handleChange={(e) => setSelectedCategory(e.target.value)}
          selectedCategory={selectedCategory}
        />
        <div className="form-group mt-3">
          <label htmlFor="datePicker">Select Date</label>
          <input
            type="date"
            id="datePicker"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary mt-3" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <div className="events-section">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events match the selected filters.</p>
          </div>
        ) : (
          <div className="event-cards">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.event_id}
                event={event}
                venues={venues}
                onShowDetails={setSelectedEvent}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          venues={venues}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default ShowEvents;
