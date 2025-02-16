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
    `SELECT v.venue_id, v.venue_name, l.location_name,l.location_id
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
const isVenueAvailable = async (req, res) => {
  const { venue_id, event_date } = req.params;
  console.log(typeof(venue_id), typeof(event_date));
  console.log(venue_id, event_date);

  db.query(
    `SELECT * FROM event WHERE venue_id = ? AND event_date = ?`,
    [venue_id, event_date],
    (err, results) => {
      // console.log(err);
      // console.log(results.length);
      if (err) {
        console.error("Error checking venue() availability:", err.message);
        return res.status(500).json({ error: "Error checking venue availability" });
      }

      if (results.length > 0) {
        // console.log("happering");
        return res.status(409).json({ message: "Venue is not available on the given date" });
      }

      res.status(200).json({ message: "Venue is available" });
    }
  );
};
module.exports = { getVenuesByLocation, getVenueLocation, isVenueAvailable };
