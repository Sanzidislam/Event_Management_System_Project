import axios from 'axios';

export const getLocations = async () => {
  try {
    const response = await axios.get('http://localhost:5000/locations');
    return response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};
