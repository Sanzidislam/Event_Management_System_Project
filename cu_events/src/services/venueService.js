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

