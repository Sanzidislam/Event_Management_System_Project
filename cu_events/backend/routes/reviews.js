const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { postReview, getReview ,getUserReview,getAllReview, getAverageReview} = require("../controllers/reviewController");

const router = express.Router();

router.post("/:event_id/review", authenticate,postReview);
router.get("/:event_id/reviews", getReview); 
router.get("/:event_id/user-review", authenticate, getUserReview);
router.get('/:event_id/average-rating', getAverageReview);
router.get("/:event_id/allReviews", getAllReview);
module.exports = router;