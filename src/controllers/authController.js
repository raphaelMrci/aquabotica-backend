const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtConfig");

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username },
        });
    } catch (err) {
        res.status(400).json({
            message:
                err.code === 11000
                    ? "Username already exists"
                    : "Error registering user",
        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(400)
                .json({ message: "Invalid username or password" });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in" });
    }
};
