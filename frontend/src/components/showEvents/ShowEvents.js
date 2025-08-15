import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchName = searchParams.get("searchName");
  const searchLoc = searchParams.get("searchLoc");

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [creatorSearch, setCreatorSearch] = useState("");
  useEffect(() => {
    loadEvents();
    loadVenues();
    loadLocations();
    loadCategories();
    if (searchName) {
      setCreatorSearch(searchName);
    }
    if(searchLoc){
      setSelectedLocation(searchLoc);
    }
    // console.log(searchName);
  }, [searchName,searchLoc]);

  useEffect(() => {
    applyFilters();
  }, [selectedLocation, selectedCategory, selectedDate, searchQuery, events, creatorSearch, searchLoc]);

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

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
        
      );
      // console.log(events);
    }
    if(creatorSearch){
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(creatorSearch.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const resetFilters = () => {
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedDate("");
    setSearchQuery("");
    setCreatorSearch("");
  };

  return (
    <div className="events-page">
      {/* Search Bar */}
      <div className="search-container">
        <Link to = "/create-event">
        <button className="btn btn-primary" style={{marginRight: "10px"}}>
          Create Your Event
        </button>
        </Link>
        <input
          type="text"
          placeholder="Search events..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
          {/* <button className="search-btn" onClick={applyFilters}>Search</button> */}
        <input
          type="text"
          placeholder="Search by creator..."
          className="search-input"
          value={creatorSearch}
          onChange={(e) => setCreatorSearch(e.target.value)}
        />
      </div>

      {/* Filters in One Line */}
      <div className="filters-container">
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
        <input
          type="date"
          className="date-picker"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="reset-btn" onClick={resetFilters}>Reset</button>
      </div>

      {/* Events Section */}
      <div className="events-section">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No events available.</p>
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
