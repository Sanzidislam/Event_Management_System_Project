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
  getEventsRegisteredByUser,
  registerEvent,
  unRegisterEvent,
  checkRegistration,
  getAvailableEventsForUser,
  getRegistrationCount
} = require("../controllers/eventController");

const router = express.Router();

// Routes
router.get("/", getAllEvents); // Fetch all events
router.get("/available",authenticate,getAvailableEventsForUser);
router.get("/user/:user_id",getEventsOfUser);
router.get("/registered/:user_id",getEventsRegisteredByUser)
router.get("/:event_id",getSpecificEvent);
router.post("/create",authenticate, createEvent); // Create a new event
router.put("/update/:event_id", updateEvent); // Update an event by ID
router.delete("/delete/:event_id",deleteEvent); // Delete an event by ID
router.post("/register/:event_id",authenticate,registerEvent);
router.delete("/unregister/:event_id", authenticate, unRegisterEvent);
router.get("/check-registration/:event_id", authenticate, checkRegistration);

// API to get the current registration count for an event
router.get("/registration-count/:event_id", getRegistrationCount);



module.exports = router;
