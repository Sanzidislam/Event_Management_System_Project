const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { postReview, getReview } = require("../controllers/reviewController");

const router = express.Router();

router.post("/:event_id/review", postReview);
router.get("/:event_id/reviews", getReview); 
module.exports = router;