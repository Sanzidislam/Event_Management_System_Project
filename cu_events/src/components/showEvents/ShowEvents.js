import React, { useState, useEffect } from "react";
import { fetchEvents, deleteEvent } from "../../services/eventService";
import { fetchVenues } from "../../services/venueService";
import EventCard from "./EventCard";
import EventDetailsModal from "./EventDetailsModal";
import EditEventModal from "./EditEventModal";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    loadEvents();
    loadVenues();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadVenues = async () => {
    try {
      const data = await fetchVenues();
      setVenues(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId);
        alert("Event deleted successfully!");
        loadEvents();
      } catch (error) {
        alert("Failed to delete event.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Events</h1>
      {events.length === 0 ? (
        <h2 className="text-center mt-5">There are no events to show</h2>
      ) : (
        <div className="row">
          {events.map((event) => (
            <EventCard
              key={event.event_id}
              event={event}
              venues={venues}
              onShowDetails={setSelectedEvent}
              onEdit={setEditEvent}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          venues={venues}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {editEvent && (
        <EditEventModal
          event={editEvent}
          onClose={() => setEditEvent(null)}
          onSave={loadEvents}
        />
      )}
    </div>
  );
};

export default ShowEvents;