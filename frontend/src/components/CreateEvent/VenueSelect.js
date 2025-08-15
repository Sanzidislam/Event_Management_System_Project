import React from 'react';

const VenueSelect = ({ venues, handleChange, selectedVenue }) => (
  <div className="mb-3">
    <label htmlFor="venue_id" className="form-label">Venue</label>
    <select
      id="venue_id"
      name="venue_id"
      className="form-select"
      onChange={handleChange}
      value={selectedVenue}
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
);

export default VenueSelect;
