const express = require("express");
const { sensorData } = require("../controllers/sensorController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/sensor-data", authenticateToken, sensorData);

module.exports = router;
