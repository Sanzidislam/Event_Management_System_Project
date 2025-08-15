// notificationService.js
import axios from "axios";
export const fetchUpdateNotifications = async (token) => {
    try {
        const response = await axios.get("http://localhost:5000/notifications/updateNotifications", {
            headers: {
                Authorization: `Bearer ${token}` // Send token in header for authentication
            }
        });
        return response.data; // Assuming the response contains the notifications
    } catch (error) {
        console.error("Error fetching notifications: ", error);
        throw error; // Rethrow the error for handling in component
    }
};