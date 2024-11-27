import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};



export const updateEvent = async (eventId, updatedEvent) => {
  try {
    await axios.put(`${API_BASE_URL}/events/update/${eventId}`, updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_BASE_URL}/events/delete/${eventId}`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post('http://localhost:5000/events/create', eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const registerEvent = async (eventId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `http://localhost:5000/events/register/${eventId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error registering for event:', error); // Updated error message
    throw error;
  }
};


export const handleRegisterClick = async (event_id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to register for the event.");
      return;
    }

    // Send a POST request to register for the event
    const response = await axios.post(
      `http://localhost:5000/events/register/${event_id}`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );

    alert(response.data || "Event registered successfully!");
  } catch (error) {
    if (error.response && error.response.status === 500) {
      alert("Failed to register for the event. Please try again.");
    } else if (error.response && error.response.status === 401) {
      alert("You must be logged in to register for an event.");
    } else {
      alert("An error occurred. Please try again later.");
    }
    console.error("Error registering for event:", error);
  }
};

export const handleUnregisterClick = async (event_id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to unregister from the event.");
      return;
    }

    const response = await axios.delete(
      `http://localhost:5000/events/unregister/${event_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert(response.data || "Event unregistered successfully!");
  } catch (error) {
    console.error("Error unregistering from event:", error);
    alert("Failed to unregister. Please try again later.");
  }
};

export const checkRegistrationStatus = async (event_id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const response = await axios.get(
      `http://localhost:5000/events/check-registration/${event_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.registered;
  } catch (error) {
    console.error("Error checking registration status:", error);
    return false;
  }
};


