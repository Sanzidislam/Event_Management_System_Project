const db = require("../config/db");

const getAllLocations = (req, res) => {
  db.query("SELECT * FROM location", (err, results) => {
    if (err) {
      console.error("Error retrieving locations:", err.message);
      return res.status(500).send("Error retrieving locations");
    }
    res.status(200).json(results);
  });
};

module.exports = { getAllLocations };
