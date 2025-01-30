const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtConfig");

exports.get_profile = async (req, res) => {
  const userId = req.device.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error getting profile" });
  }
};

exports.update_profile = async (req, res) => {
  const userId = req.device.userId;
  const { username, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username;
    user.password = password;
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

exports.get_devices = async (req, res) => {
  const userId = req.device.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.devices);
  } catch (err) {
    res.status(500).json({ message: "Error getting devices" });
  }
};
