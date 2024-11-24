import React from "react";
import EventCard from "./EventCard";

const RegisteredEvents = ({ events }) => (
  <div className="mt-5">
    <h2 className="text-center text-info">Events You Registered For</h2>
    {events.length > 0 ? (
      <div className="row mt-4">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.event_id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    ) : (
      <h4 className="text-center text-muted">You haven't registered for any events</h4>
    )}
  </div>
);

export default RegisteredEvents;
