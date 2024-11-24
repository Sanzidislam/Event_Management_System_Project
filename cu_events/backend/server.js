const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());

app.use(bodyParser.json());


// Import routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const locationRoutes = require("./routes/locations");
const venueRoutes = require("./routes/venues");
const categoryRoutes = require("./routes/categories");

// Use routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/locations", locationRoutes);
app.use("/venues", venueRoutes);
app.use("/categories", categoryRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});