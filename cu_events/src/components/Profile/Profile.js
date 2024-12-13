import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

import ToggleButtons from "./ToggleButtons";
import EventCard from "./EventCard";
import EventCardOfRegister from "../showEvents/EventCard";
import { fetchEvents, deleteEvent } from "../../services/eventService";
import { fetchVenues } from "../../services/venueService";

import EventDetailsModal from "../showEvents/EventDetailsModal";
import EditEventModal from "./EditEventModal";
import ShowRegisteredUsersModal from "./ShowRegisteredUsersModal";
import ShowReviewsMOdal from "./ShowReviewsModal";
import "../../all-css/Profile.css"
import RegisteredEventCard from "./RegisteredEventCard";
const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [showCreatedEvents, setShowCreatedEvents] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [eventReviews, setEventReviews] = useState([]);
  const [showReviewsModal , setShowReviewsModal] = useState(false);
  const [eventReviewsStatus, setEventReviewsStatus] = useState(false);
  const [showRegisteredUsersModal, setShowRegisteredUsersModal] = useState(false);
  const [registered_users_status, set_registered_users_status] = useState('');
  const navigate = useNavigate();
  ////////

  const [venues, setVenues] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  ///////
  useEffect(() => {
    const token = localStorage.getItem("token");
/////////////
loadEvents();
loadVenues();
////////////
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserProfile(response.data);
        fetchCreatedEvents(response.data.user_id);
        fetchRegisteredEvents(response.data.user_id);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        navigate("/login");
      });
  }, [navigate]);

  const fetchCreatedEvents = (userId) => {
    axios
      .get(`http://localhost:5000/events/user/${userId}`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching created events:", error));
  };

  const fetchRegisteredEvents = (userId) => {
    axios
      .get(`http://localhost:5000/events/registered/${userId}`)
      .then((response) => setRegisteredEvents(response.data))
      .catch((error) => console.error("Error fetching registered events:", error));
  };
  const fetchRegisteredUsers = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/events/registered_users/${eventId}`);
      setRegisteredUsers(response.data);
      set_registered_users_status(response.status);
      setShowRegisteredUsersModal(true);
      console.log(response);
      console.log(eventId);
    } catch (error) {
      console.error("Error fetching registered users:", error);
      alert("Failed to fetch registered users.");
    }
  };
  const fetchEventReviews = async(eventId) =>{
    try{
      const response = await axios.get(`http://localhost:5000/reviews/${eventId}/allReviews`);
      setEventReviews(response.data);
      setEventReviewsStatus(response.status);
      setShowReviewsModal(true);
    }
    catch(error){
      console.error("Error fetching event reviews:", error);
      alert("Failed to fetch Reviews");
    }
  }
  

  const handleEditEvent = (eventId) => {
    
  };

  //////////////
  const loadEvents = async () => {
    const token = localStorage.getItem("token");
    axios
    .get("http://localhost:5000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        fetchCreatedEvents(response.data.user_id);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        navigate("/login");
      });
    
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
  /////////////

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <ProfileInfo userProfile={userProfile} />
      <ToggleButtons onToggle={setShowCreatedEvents} showCreatedEvents={showCreatedEvents} />
      {showCreatedEvents ? (
        <div className="container mt-5">

      {events.length === 0 ? (
        <>
        <h2 className="text-center mt-5">You have no events.</h2>
        <div className="text-center my-5">
        <Link to= '/create-event'>
            <button className="btn btn-danger">Create now</button>
        </Link>
        </div>
        </>
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
              onShowRegisteredUsers={fetchRegisteredUsers}
              onShowReviews={fetchEventReviews}

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
      ) : (
        <div className="row">
          {/* {registeredEvents.map((event) => (
            <RegisteredEventCard
              key={event.event_id}
              event={event}
              venues={venues}
              id = {userProfile.user_id}
              onShowDetails={setSelectedEvent}
              token = {localStorage.getItem('token')}
            />
          ))} */}
          {registeredEvents.length === 0 ? (
    <p>You haven't registered for any events yet.</p>
  ) : (
    registeredEvents.map((event) => (
      <RegisteredEventCard
        key={event.event_id}
        event={event}
        venues={venues}
        id={userProfile.user_id}
        onShowDetails={setSelectedEvent}
        token={localStorage.getItem('token')}
      />
    ))
  )}
        </div>
      )}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          venues={venues}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {showRegisteredUsersModal && (
  <ShowRegisteredUsersModal
    users={registeredUsers}
    onClose={() => setShowRegisteredUsersModal(false)}
    state = {registered_users_status}
  />
 )} 
      {showReviewsModal && (
  <ShowReviewsMOdal
    users={eventReviews}
    onClose={() => setShowReviewsModal(false)}
    state = {eventReviewsStatus}
  />
 )}


    </div>
  );
};

export default Profile;
