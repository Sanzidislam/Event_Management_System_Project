const db = require("../config/db");

const getAllEvents = (req, res) => {
  db.query("SELECT * FROM event", (err, results) => {
    if (err) return res.status(500).send("Error retrieving events");
    res.status(200).json(results);
  });
};


const getEventsOfUser = (req, res) => {
  const user_id = req.params;
  // console.log(user_id.user_id);
  db.query("select * from event where user_id = ?",[user_id.user_id],
    (err,results)=>{
    if (err) return res.status(500).send("Error retrieving events");
    res.status(200).json(results);
  });
};

const getEventsRegisteredByUser = (req, res) => {
  const user_id = req.params;
  // console.log(user_id.user_id);
  db.query("select * from event e join registers r on r.event_id = e.event_id join user u on u.user_id = r.user_id where u.user_id = ?;",[user_id.user_id],
    (err,results)=>{
    if (err) return res.status(500).send("Error retrieving events");
    res.status(200).json(results);
  });
};

const createEvent = (req, res) => {
  const { event_name, description, event_date, start_time, end_time, max_attendees, venue_id, category_id } = req.body;
  //console.log(req.user);
  const user_id = req.user.user_id;
  //console.log(user_id);
  db.query(
    "INSERT INTO event (event_name, description, event_date, start_time, end_time, max_attendees, venue_id, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [event_name, description, event_date, start_time, end_time, max_attendees, venue_id, category_id, user_id],
    (err) => {
      if (err) return res.status(500).send("Failed to create event");
      res.status(201).send("Event created successfully!");
    }
  );
};

// Update an event by ID
const updateEvent = (req, res) => {
  const { event_id } = req.params;
  const { event_name, description, event_date, start_time, end_time, max_attendees, venue_id, category_id } = req.body;

  db.query(
    "UPDATE event SET event_name = ?, description = ?, event_date = ?, start_time = ?, end_time = ?, max_attendees = ?, venue_id = ?, category_id = ? WHERE event_id = ?",
    [event_name, description, event_date, start_time, end_time, max_attendees, venue_id, category_id, event_id],
    (err, results) => {
      if (err) return res.status(500).send("Failed to update event");
      if (results.affectedRows === 0) return res.status(404).send("Event not found");
      res.status(200).send("Event updated successfully!");
    }
  );
};

// Delete an event by ID
const deleteEvent = (req, res) => {
  const { event_id } = req.params;
  // console.log(event_id);
  db.query(
    "DELETE FROM event WHERE event_id = ?",
    [event_id],
    (err, results) => {
      if (err) return res.status(500).send("Failed to delete event");
      if (results.affectedRows === 0) return res.status(404).send("Event not found");
      res.status(200).send("Event deleted successfully!");
    }
  );
};

const getSpecificEvent = (req,res) => {
  const event_id = req.params;
  db.query(
    "select *  FROM event WHERE event_id = ?",
    [event_id],
    (err, results) => {
      if (err) return res.status(500).send("Failed to delete event");
      res.status(200).send(results);
    }
  );
}

module.exports = { getAllEvents, createEvent, updateEvent, deleteEvent , getSpecificEvent,getEventsOfUser,getEventsRegisteredByUser};
