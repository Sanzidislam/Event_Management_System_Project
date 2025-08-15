import React from 'react';

const LocationSelect = ({ locations, handleChange, selectedLocation }) => (
  <div className="mb-3">
    <label htmlFor="location_id" className="form-label">Location</label>
    <select
      id="location_id"
      name="location_id"
      className="form-select"
      onChange={handleChange}
      value={selectedLocation}
      required
    >
      <option value="">Select Location</option>
      {locations.map((location) => (
        <option key={location.location_id} value={location.location_id}>
          {location.location_name}
        </option>
      ))}
    </select>
  </div>
);

export default LocationSelect;
