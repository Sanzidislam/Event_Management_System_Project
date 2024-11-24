import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [username, setUsername] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');

  // Fetch events to display in a dropdown
  useEffect(() => {
    axios
      .get('http://localhost:3001/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/registers', {
        username,
        event_id: selectedEvent,
        registration_date: registrationDate,
      });
      alert(response.data); // Success message
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register for an Event</h2>
      <select onChange={(e) => setSelectedEvent(e.target.value)} required>
        <option value="">Select an Event</option>
        {events.map((event) => (
          <option key={event.event_id} value={event.event_id}>
            {event.event_name}
          </option>
        ))}
      </select>
      <input name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <input type="date" onChange={(e) => setRegistrationDate(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterEvent;
