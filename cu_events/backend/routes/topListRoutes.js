const express = require("express");
const { getTopCreators } = require("../controllers/topListControllers");

const router = express.Router();

router.get("/getTopCreators", getTopCreators);

module.exports = router;
