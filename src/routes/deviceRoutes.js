const express = require("express");
const {
    registerDevice,
    associateDevice,
} = require("../controllers/deviceController");
const router = express.Router();

router.post("/register-device", registerDevice);
router.post("/associate-device", associateDevice);

module.exports = router;
