const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getSpecificEvent,
  getEventsOfUser,
  getCreatedEvents,
  getEventsRegisteredByUser
} = require("../controllers/eventController");

const router = express.Router();

// Routes
router.get("/", getAllEvents); // Fetch all events
router.get("/:user_id",getEventsOfUser);
router.get("/registered/:user_id",getEventsRegisteredByUser)
router.get("/:event_id",getSpecificEvent);
router.post("/create",authenticate, createEvent); // Create a new event
router.put("/update/:event_id", updateEvent); // Update an event by ID
router.delete("/delete/:event_id",deleteEvent); // Delete an event by ID

module.exports = router;
