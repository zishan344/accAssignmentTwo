const express = require("express");
const app = express();
const cors = require("cors");
const allTours = require("./routes/v1/tours.Route");

// middleware
app.use(express.json());
app.use(cors());
app.use("/api/v1/allTours", allTours);
app.get("/", (req, res) => {
  res.send("server run successfully ");
});

module.exports = app;
