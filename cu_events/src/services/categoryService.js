import axios from 'axios';

export const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5000/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
