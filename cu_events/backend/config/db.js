const mysql = require("mysql2");
const dotenv = require('dotenv')
dotenv.config()
const db = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
db.connect((err) => {
  if (err) {
    console.error("Database connect++ion failed:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;
