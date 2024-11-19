const Device = require("../models/device");

exports.registerDevice = async (req, res) => {
    const { uuid } = req.body;
    try {
        let device = await Device.findOne({ uuid });
        if (!device) {
            device = new Device({ uuid });
            await device.save();
        }
        res.json({ message: "Device registered", device });
    } catch (err) {
        res.status(500).json({ message: "Error registering device" });
    }
};

exports.associateDevice = async (req, res) => {
    const { uuid, username } = req.body;
    try {
        const device = await Device.findOne({ uuid }).populate("userId");
        if (device.userId) {
            return res
                .status(400)
                .json({ message: "Device already associated" });
        }
        const user = await User.findOne({ username });
        device.userId = user._id;
        await device.save();
        res.json({ message: "Device associated", device });
    } catch (err) {
        res.status(500).json({ message: "Error associating device" });
    }
};
