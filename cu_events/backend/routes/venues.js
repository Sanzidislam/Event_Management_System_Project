const express = require("express");
const { getVenuesByLocation, getVenueLocation, getVenueLocatedin } = require("../controllers/venueController");
const router = express.Router();

router.get("/:location_id", getVenuesByLocation);
router.get("/", getVenueLocation);
// router.get("/:located-in",getVenueLocatedin);

module.exports = router;
