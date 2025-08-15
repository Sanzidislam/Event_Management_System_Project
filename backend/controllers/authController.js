// authcontroller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const path = require("path");
const fs = require("fs");

const registerUser = async (req, res) => {
  const { name, email, password, contact_number } = req.body;

  try {
    // Check if the email is already registered
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Internal server error");
      }

      if (results.length > 0) {
        // Email already exists
        return res.status(400).send("Email is already registered");
      }

      // If email does not exist, hash the password and register the user
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO user (name, email, password, contact_number) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, contact_number],
        (insertErr) => {
          if (insertErr) {
            console.error("Error during registration:", insertErr);
            return res.status(500).send("Error during registration");
          }
          res.status(200).send("User registered successfully!");
        }
      );
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
};


const loginUser = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM user WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send("Invalid credentials");

    const isValid = await bcrypt.compare(password, results[0].password);
    if (!isValid) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ user_id: results[0].user_id }, "secret", { expiresIn: "1h" });
    res.cookie('token', token); // Set the token as a cookie if needed
    res.status(200).json({ token });
  });
};

const updatePassword = (req, res) => {
  const { user_id } = req.params;
  const { oldPassword, newPassword } = req.body;

  db.query("SELECT * FROM user WHERE user_id = ?", [user_id], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send("Invalid credentials");

    const isValid = await bcrypt.compare(oldPassword, results[0].password);
    if (!isValid) return res.status(401).send("Invalid credentials");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE user SET password = ? WHERE user_id = ?", [hashedPassword, user_id], (updateErr) => {
      if (updateErr) return res.status(500).send("Error updating password");
      res.status(200).send("Password updated successfully");
    });
  });
};


const getProfile = (req, res) => {
    // serUser_id();
    const user_id = req.user.user_id 
    db.query("SELECT * FROM user WHERE user_id = ?", [user_id], (err, results) => {
      if (err) return res.status(500).send("Error fetching profile");
      if (results.length === 0) return res.status(404).send("User not found");
      res.status(200).json(results[0]); // Send user profile data
    });
};
// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, contact_number } = req.body;
    let profile_picture;

    if (req.file) {
      profile_picture = req.file.path; // Save the uploaded file path
    }

    if (!user_id || !name || !contact_number) {
      return res.status(401).send("Invalid credentials");
    }

    // Update query to include profile_picture if available
    await db.promise().query(
      `UPDATE user SET name = ?, contact_number = ?, profile_picture = ? WHERE user_id = ?`,
      [name, contact_number, profile_picture || null, user_id]
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const uploadProfilePicture = (req, res) => {
  try {
    const { user_id } = req.params;

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Construct the file path
    const filePath = path.join("uploads", req.file.filename);

    // Update the user's profile picture in the database
    const query = "UPDATE user SET profile_picture = ? WHERE user_id = ?";
    db.query(query, [filePath, user_id], (error, results) => {
      if (error) {
        console.error("Error in uploadProfilePicture:", error);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({
        message: "Profile picture uploaded successfully",
        filePath,
      });
    });
  } catch (error) {
    console.error("Error in uploadProfilePicture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  getProfile,
  updateUserProfile,
  uploadProfilePicture,
  updatePassword 
};
