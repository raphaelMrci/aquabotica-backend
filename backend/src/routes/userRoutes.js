const express = require("express");
const {
  get_profile,
  update_profile,
  get_devices,
  get_my_id,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/me", authenticateToken, get_my_id);
router.get("/profile", authenticateToken, get_profile);
router.put("/profile", authenticateToken, update_profile);
router.get("/devices", authenticateToken, get_devices);

module.exports = router;
