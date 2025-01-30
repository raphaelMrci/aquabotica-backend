const express = require("express");
const mqttClient = require("./config/mqttConfig");
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/api/user", userRoutes);
app.use("/alive", (req, res) => {
  res.send("I'm alive!");
});

module.exports = app;
