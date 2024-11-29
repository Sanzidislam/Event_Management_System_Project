import React, { useState, useEffect } from "react";
import { fetchEvents } from "../../services/eventService";
import { fetchVenues } from "../../services/venueService";
import EventCard from "./EventCard";
import EventDetailsModal from "./EventDetailsModal";
import LocationSelect from "../CreateEvent/LocationSelect";
import CategorySelect from "../CreateEvent/CategorySelect";
import { getLocations } from "../../services/locationService";
import { getCategories } from "../../services/categoryService";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    loadEvents();
    loadVenues();
    loadLocations();
    loadCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedLocation, selectedCategory, events]);

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

    setFilteredEvents(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Events</h1>

      {/* Filters */}
      <div className="d-flex justify-content-between mb-4">
        <div className="me-3">
          <LocationSelect
            locations={locations}
            handleChange={(e) => setSelectedLocation(e.target.value)}
            selectedLocation={selectedLocation}
          />
        </div>
        <div>
          <CategorySelect
            categories={categories}
            handleChange={(e) => setSelectedCategory(e.target.value)}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <h2 className="text-center mt-5">No events match the selected filters.</h2>
      ) : (
        <div className="row">
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

      {/* Event Details Modal */}
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
