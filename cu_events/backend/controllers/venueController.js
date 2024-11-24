const db = require("../config/db");

const getVenuesByLocation = (req, res) => {
  const { location_id } = req.params;
  db.query("SELECT * FROM venue WHERE location_id = ?", [location_id], (err, results) => {
    if (err) {
      console.error("Error retrieving venues:", err.message);
      return res.status(500).send("Error retrieving venues");
    }
    res.status(200).json(results);
  });
};

const getVenueLocation = (req, res) => {
  db.query(
    `SELECT v.venue_id, v.venue_name, l.location_name
     FROM venue v
     JOIN location l ON v.location_id = l.location_id`,
    (err, results) => {
      if (err) {
        console.error("Error retrieving venue and location:", err.message);
        return res.status(500).send("Error retrieving venue and location");
      }
      res.status(200).json(results);
    }
  );
};

module.exports = { getVenuesByLocation, getVenueLocation };
