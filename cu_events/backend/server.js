const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path  = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());

app.use(bodyParser.json());


// Import routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const locationRoutes = require("./routes/locations");
const venueRoutes = require("./routes/venues");
const categoryRoutes = require("./routes/categories");
const reviewRoutes = require("./routes/reviews");
const topListRoutes = require("./routes/topListRoutes");
const notificationRoutes = require("./routes/notifications")
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// Use routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/locations", locationRoutes);
app.use("/venues", venueRoutes);
app.use("/categories", categoryRoutes);
app.use("/reviews", reviewRoutes);
app.use("/notifications", notificationRoutes); 
app.use("/topList",topListRoutes);  
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT); 

});