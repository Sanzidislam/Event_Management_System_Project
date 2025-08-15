import React from "react";
import EventCard from "./EventCard";

const CreatedEvents = ({ events, onEdit, onDelete }) => (
  <div className="mt-5">
    <h2 className="text-center text-success">Events You Created</h2>
    {events.length > 0 ? (
      <div className="row mt-4">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.event_id}>
            <EventCard event={event} onEdit={onEdit} onDelete={onDelete} showActions />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center">
        <h4 className="text-center text-muted">You haven't created any events</h4>
        <button className="btn btn-success btn-lg my-5" onClick={() => window.location.href = "/create-event"}>
          Create Event
        </button>
      </div>
    )}
  </div>
);

export default CreatedEvents;
