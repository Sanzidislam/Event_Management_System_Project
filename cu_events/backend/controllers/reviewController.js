const db = require("../config/db"); // Ensure `db` uses mysql2/promise

const postReview = async (req, res) => {
  const { event_id } = req.params;
  const { review_text, rating } = req.body;
  const user_id = req.user.user_id;
  try {
    // Check if the event date has passed
    const [events] = await db.promise().query(
      "SELECT event_date FROM event WHERE event_id = ?",
      [event_id]
    );

    if (events.length === 0 || new Date(events[0].event_date) >= new Date()) {
      return res
        .status(400)
        .json({ message: "Cannot review an upcoming event." });
    }

    // Insert the review
    await db.promise().query(
      "INSERT INTO reviews (event_id, user_id, review_text, rating) VALUES (?, ?, ?, ?)",
      [event_id, user_id, review_text, rating]
    );

    res.status(200).json({ message: "Review submitted successfully!" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getReview = async (req, res) => {
  const { event_id } = req.params;

  try {
    const [reviews] = await db.promise().query(
      "SELECT r.review_text, r.rating, r.review_date, u.name AS user_name " +
        "FROM reviews r JOIN user u ON r.user_id = u.user_id " +
        "WHERE r.event_id = ?",
      [event_id]
    );

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error." });
  }
};
const getUserReview = async (req, res) => {
  const { event_id } = req.params;
  const user_id = req.user.user_id;  // Assuming you're using middleware to get the logged-in user's ID
  console.log(event_id, user_id);
  try {
    const [rows] = await db.promise().query(
      "SELECT review_text, rating FROM reviews WHERE event_id = ? AND user_id = ?",
      [event_id, user_id]
    );

    if (rows.length > 0) {
      res.json(rows[0]);  // Return the user's review and rating
    } else {
      res.status(201).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.error("Error fetching user review:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Fetch the average rating for a specific event

const getAverageReview = async (req, res) => {
  const { event_id } = req.params;

  try {
    const [rows] = await db.promise().query(
      "SELECT AVG(rating) AS average_rating FROM reviews WHERE event_id = ?",
      [event_id]
    );

    if (rows.length > 0) {
      res.json({ average_rating: rows[0].average_rating });
    } else {
      res.json({ average_rating: 0 });
    }
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getAllReview = async (req, res) => {
  const { event_id } = req.params;

  try {
    const [reviews] = await db.promise().query(
      "select r.review_id, r.event_id, r.review_text, r.rating, r.review_date, u.user_id, u.name,u.email, u.profile_picture from reviews r join user u on r.user_id = u.user_id where event_id = ?",
      [event_id]
    );
    if(reviews.length ==0 ) res.status(201).json({message:"no reviews yet!"});
    else
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error." });
  }
};
module.exports = { postReview, getReview ,getUserReview,getAverageReview,getAllReview};
