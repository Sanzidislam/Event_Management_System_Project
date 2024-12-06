// auth.js
const express = require("express");
const multer = require("multer");
const { registerUser, loginUser, getProfile , updateUserProfile, uploadProfilePicture} = require("../controllers/authController");
const router = express.Router();
const {authenticate} = require('../middlewares/authMiddleware')
const path = require("path");
// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate,getProfile); // Change POST to GET for profile fetching
router.put(
  "/profile/update/:user_id",
  upload.single("profile_picture"), // Use multer middleware for single file upload
  updateUserProfile
);
router.put("/profile/picture/update/:user_id", upload.single("profile_picture"), uploadProfilePicture);
module.exports = router;

