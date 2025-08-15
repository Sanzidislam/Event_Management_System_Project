const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { getUpdateNotsForUser } = require("../controllers/notificationController");

const router = express.Router();

router.get("/updateNotifications",authenticate,getUpdateNotsForUser);
module.exports = router;