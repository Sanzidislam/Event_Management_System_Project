import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error; // Propagate the error to the calling component
  }
};


// Function to handle user login
export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // Assumes response contains a token
    } catch (error) {
      throw error; // Propagate the error to the calling component
    }
  };
