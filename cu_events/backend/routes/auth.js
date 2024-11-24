// auth.js
const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const router = express.Router();
const {authenticate} = require('../middlewares/authMiddleware')
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate,getProfile); // Change POST to GET for profile fetching

module.exports = router;

