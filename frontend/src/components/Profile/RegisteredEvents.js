import React from "react";
import RegisteredEventCard from "./RegisteredEventCard";

const RegisteredEvents = ({ events, venues }) => (
  <div className="mt-5">
    <h2 className="text-center text-info">Events You Registered For</h2>
    {events.length > 0 ? (
      <div className="row mt-4">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.event_id}>
            <RegisteredEventCard event={event} venues={venues} />
          </div>
        ))}
      </div>
    ) : (
      <h4 className="text-center text-muted">You haven't registered for any events</h4>
    )}
  </div>
);

export default RegisteredEvents;
