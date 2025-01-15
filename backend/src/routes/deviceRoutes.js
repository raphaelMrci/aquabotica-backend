const express = require("express");
const { associateDevice } = require("../controllers/deviceController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/associate", authenticateToken, associateDevice);

module.exports = router;
