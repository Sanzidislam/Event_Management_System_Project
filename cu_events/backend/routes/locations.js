const express = require("express");
const { getAllLocations, mostPopularLocations } = require("../controllers/locationController");
const router = express.Router();

router.get("/", getAllLocations);
router.get("/popularLocations",mostPopularLocations)
module.exports = router;
