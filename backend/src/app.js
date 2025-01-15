// app.js
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const sensorRoutes = require("./routes/sensorRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/alive", (req, res) => {
  res.send("I'm alive!");
});

module.exports = app;
