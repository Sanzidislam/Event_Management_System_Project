import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchVenues = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/venues`);
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};


export const getVenues = async (locationId) => {
  try {
    const response = await axios.get(`http://localhost:5000/venues/${locationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

export const is_venueAvailable = async (venue_id, event_date) => {
  try {
    const response = await axios.get(`http://localhost:5000/venues/check/available/${venue_id}/${event_date}`);
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // Handle 409 Conflict as a valid response
      console.log("Venue is not available:", error.response.data);
      return error.response.data; // Return the error response data
    }
    // Handle other errors
    console.error("Error checking venue availability:", error.message);
    throw error;
  }
};

