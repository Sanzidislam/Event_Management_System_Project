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


const mostPopularLocations = (req,res) =>{
  db.query("select count(e.event_id) as total_events,l.location_id, l.location_name from event e join venue v on e.venue_id = v.venue_id join location l on l.location_id = v.venue_id group by l.location_id order by count(e.event_id) desc limit 4;",
    (err,results)=> {
      if(err){
        console.error("Error retrieving locations:", err.message);
        return res.status(500).send("Error retrieving locations")
      }
      res.status(200).json(results);
    }
  )

};
module.exports = { getAllLocations ,mostPopularLocations};
