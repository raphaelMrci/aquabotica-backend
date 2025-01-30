const express = require("express");
const {
  associateDevice,
  dissociateDevice,
} = require("../controllers/deviceController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/associate", authenticateToken, associateDevice);
router.post("/dissociate", authenticateToken, dissociateDevice);

module.exports = router;
