const mysql = require("mysql2");
const dotenv = require('dotenv')
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hello@mysql",
  database: "campus_event",
});

db.connect((err) => {
  if (err) {
    console.error("Database connect++ion failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;
