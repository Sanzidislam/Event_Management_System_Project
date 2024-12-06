const db = require("../config/db"); // Ensure `db` uses mysql2/promise

const postReview = async (req, res) => {
  const { event_id } = req.params;
  const { user_id, review_text, rating } = req.body;

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

module.exports = { postReview, getReview };
