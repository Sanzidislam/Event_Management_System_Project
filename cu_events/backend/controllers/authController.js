// authcontroller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

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

const getProfile = (req, res) => {
    const user_id = req.user.user_id;
    db.query("SELECT * FROM user WHERE user_id = ?", [user_id], (err, results) => {
      if (err) return res.status(500).send("Error fetching profile");
      if (results.length === 0) return res.status(404).send("User not found");
      res.status(200).json(results[0]); // Send user profile data
    });
};

module.exports = { registerUser, loginUser, getProfile };
