const db = require("../config/db");

const getAllCategories = (req, res) => {
  db.query("SELECT * FROM event_category", (err, results) => {
    if (err) {
      console.error("Error retrieving categories:", err.message);
      return res.status(500).send("Error retrieving categories");
    }
    res.status(200).json(results);
  });
};

module.exports = { getAllCategories };
