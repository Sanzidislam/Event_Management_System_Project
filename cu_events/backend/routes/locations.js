const express = require("express");
const { getAllLocations } = require("../controllers/locationController");
const router = express.Router();

router.get("/", getAllLocations);

module.exports = router;
