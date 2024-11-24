// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser')
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // Your MySQL username
//   password: 'hello@mysql', // Your MySQL password
//   database: 'campus_event', // Your database name
// });

// // Connect to the database and handle connection errors
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     process.exit(1); // Exit the application if the database connection fails
//   }
//   console.log('Connected to the MySQL database');
// });

// // Middleware to check database connection status
// app.use((req, res, next) => {
//   if (!db.state || db.state === 'disconnected') {
//     return res.status(500).send('Database connection lost');
//   }
//   next();
// });

// // Register a new user
// app.post('/register', async (req, res) => {
//   const { username, name, email, password, user_type, contact_number } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     db.query(
//       'INSERT INTO user (username, name, email, password, user_type, contact_number) VALUES (?, ?, ?, ?, ?, ?)',
//       [username, name, email, hashedPassword, user_type, contact_number],
//       (err, result) => {
//         if (err) {
//           console.error('Error during user registration:', err.message);
//           return res.status(500).send('Error during registration');
//         }
//         res.status(200).send('User registered successfully!');
//       }
//     );
//   } catch (error) {
//     console.error('Error hashing password:', error.message);
//     res.status(500).send('Internal server error');
//   }
// });

// // Login a user
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
//     if (err) {
//       console.error('Error during login query:', err.message);
//       return res.status(500).send('Error during login');
//     }
//     if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
//       return res.status(401).send('Invalid credentials');
//     }

//     const token = jwt.sign({ username: results[0].username }, 'secret', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   });
// });

// // Show all events
// app.get('/events', (req, res) => {
//   db.query('SELECT * FROM event', (err, results) => {
//     if (err) {
//       console.error('Error retrieving events:', err.message);
//       return res.status(500).send('Error retrieving events');
//     }
//     res.status(200).json(results);
//   });
// });

// // Create an event
// app.post('/events', (req, res) => {
//   const { event_name, description, event_date, start_time, end_time, max_attendees, category_id, venue_id, username } = req.body;

//   db.query(
//     'INSERT INTO event (event_name, description, event_date, start_time, end_time, max_attendees, category_id, venue_id, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//     [event_name, description, event_date, start_time, end_time, max_attendees, category_id, venue_id, username],
//     (err, result) => {
//       if (err) {
//         console.error('Error creating event:', err.message);
//         return res.status(500).send('Error creating event');
//       }
//       res.status(200).send('Event created successfully!');
//     }
//   );
// });

// // Register for an event
// app.post('/registers', (req, res) => {
//   const { username, event_id, registration_date } = req.body;

//   db.query(
//     'INSERT INTO registers (username, event_id, registration_date) VALUES (?, ?, ?)',
//     [username, event_id, registration_date],
//     (err, result) => {
//       if (err) {
//         console.error('Error registering for event:', err.message);
//         return res.status(500).send('Error during registration');
//       }
//       res.status(200).send('Registration successful!');
//     }
//   );
// });

// // Handle invalid routes
// app.use((req, res) => {
//   res.status(404).send('Route not found');
// });

// // Start the server
// const PORT = 8800;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost", // Replace with your MySQL host
    user: "root", // Replace with your MySQL username
    password: "hello@mysql", // Replace with your MySQL password
    database: "campus_event", // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});



// Middleware to check database connection status
app.use((req, res, next) => {
  if (!db.state || db.state === 'disconnected') {
    return res.status(500).send('Database connection lost');
  }
  next();
});



// // Register a new user
// app.post('/register', async (req, res) => {
//   const { username, name, email, password, user_type, contact_number } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     db.query(
//       'INSERT INTO user (username, name, email, password, user_type, contact_number) VALUES (?, ?, ?, ?, ?, ?)',
//       [username, name, email, hashedPassword, user_type, contact_number],
//       (err, result) => {
//         if (err) {
//           console.error('Error during user registration:', err.message);
//           return res.status(500).send('Error during registration');
//         }
//         res.status(200).send('User registered successfully!');
//       }
//     );
//   } catch (error) {
//     console.error('Error hashing password:', error.message);
//     res.status(500).send('Internal server error');
//   }
// });



// // Login a user
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
//     if (err) {
//       console.error('Error during login query:', err.message);
//       return res.status(500).send('Error during login');
//     }
//     if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
//       return res.status(401).send('Invalid credentials');
//     }

//     const token = jwt.sign({ username: results[0].username }, 'secret', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   });
// });

// // API Endpoints
// app.get("/", (req, res) => {
//     db.query("SELECT * FROM user", (err, results) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.json(results);
//         }
//     });
// });

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});
