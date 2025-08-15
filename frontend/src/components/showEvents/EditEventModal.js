// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getLocations } from '../../services/locationService';
// import { getVenues } from '../../services/venueService';
// import { getCategories } from '../../services/categoryService';
// import { createEvent } from '../../services/eventService';
// import EventForm from '../CreateEvent/EventForm';
// import LocationSelect from '../CreateEvent/LocationSelect';
// import VenueSelect from '../CreateEvent/VenueSelect';
// import CategorySelect from '../CreateEvent/CategorySelect';
// import { updateEvent } from "../../services/eventService";
// const EditEventModal = ({ event, onClose, onSave }) => {
//   // const [eventData, setEventData] = useState({
//   //   event_name: '',
//   //   description: '',
//   //   event_date: '',
//   //   start_time: '',
//   //   end_time: '',
//   //   max_attendees: '',
//   //   location_id: '',
//   //   venue_id: '',
//   //   category_id: '',
//   //   user_id: 1, // Temporary user ID
//   // });
//   const [eventData, setEventData] = useState({ ...event });

//   const [locations, setLocations] = useState([]);
//   const [venues, setVenues] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getLocations().then(setLocations).catch(console.error);
//     getCategories().then(setCategories).catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (eventData.location_id) {
//       getVenues(eventData.location_id).then(setVenues).catch(console.error);
//     } else {
//       setVenues([]);
//     }
//   }, [eventData.location_id]);

//   const handleChange = (e) => setEventData({ ...eventData, [e.target.name]: e.target.value });
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const message = await createEvent(eventData);
//   //     alert(message);
//   //     navigate('/');
//   //   } catch {
//   //     alert('Event creation failed!');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateEvent(event.event_id, eventData);
//       alert("Event updated successfully!");
//       onSave();
//       onClose();
//     } catch (error) {
//       alert("Failed to update event.");
//     }
//   };
//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Create Event</h2>
//       <EventForm eventData={eventData} handleChange={handleChange} handleSubmit={handleSubmit}>
//         <LocationSelect
//           locations={locations}
//           handleChange={handleChange}
//           selectedLocation={eventData.location_id}
//         />
//         <VenueSelect
//           venues={venues}
//           handleChange={handleChange}
//           selectedVenue={eventData.venue_id}
//         />
//         <CategorySelect
//           categories={categories}
//           handleChange={handleChange}
//           selectedCategory={eventData.category_id}
//         />
//       </EventForm>
//     </div>
//   );
// };
// export default EditEventModal;




import React, { useState } from "react";
import { updateEvent } from "../../services/eventService";
import { getLocations } from '../../services/locationService';
import { getVenues } from '../../services/venueService';
import { getCategories } from '../../services/categoryService';
const EditEventModal = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(event.event_id, formData);
      alert("Event updated successfully!");
      onSave();
      onClose();
    } catch (error) {
      alert("Failed to update event.");
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Event</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="event_name" className="form-label">Event Name</label>
                <input
                  id="event_name"
                  name="event_name"
                  className="form-control"
                  value={formData.event_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="event_date" className="form-label">Event Date</label>
                <input
                  id="event_date"
                  type="date"
                  name="event_date"
                  className="form-control"
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">start_time</label>
                <input
                  id="start_time"
                  type="time"
                  name="start_time"
                  className="form-control"
                  value={formData.start_time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">end_time</label>
                <input
                  id="end_time"
                  type="time"
                  name="end_time"
                  className="form-control"
                  value={formData.end_time}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
