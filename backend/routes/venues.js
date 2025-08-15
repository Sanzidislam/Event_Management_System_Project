const express = require("express");
const { getVenuesByLocation, getVenueLocation, getVenueLocatedin, isVenueAvailable } = require("../controllers/venueController");
const router = express.Router();

router.get("/:location_id", getVenuesByLocation);
router.get("/", getVenueLocation);
router.get("/check/available/:venue_id/:event_date",isVenueAvailable);
// router.get("/:located-in",getVenueLocatedin);

module.exports = router;
