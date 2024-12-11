// eventService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend API URL

// Fetch user's review for a specific event
export const getUserReview = async (event_id,token) => {
  try {
    const response = await axios.
        get(`${API_URL}/reviews/${event_id}/user-review`,{
            headers: {Authorization: `Bearer ${token}` },
        });
    // console.log(response);
    // if(response.status==201) console.log("No Reviews yet");
    return response;  // The user's review and rating
  } catch (error) {
    console.error('Error fetching user review:', error);
    throw error;
  }
};


// Fetch average rating for a specific event
export const getAverageRating = async (event_id) => {
    try {
      const response = await axios.get(`${API_URL}/reviews/${event_id}/average-rating`);
      return response.data.average_rating;  // The average rating for the event
    } catch (error) {
      console.error('Error fetching average rating:', error);
      throw error;
    }
  };
