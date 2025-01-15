const Device = require("../models/device");

// register the deviceto the new use. Dissociate it from the old user if it was associated with any.
exports.associateDevice = async (req, res) => {
  const { device_uuid, device_name } = req.body;
  // get the user id from the token
  const { userId } = req.device;
  console.log(req.device);
  try {
    // find the device by uuid
    let device = await Device.findOne({ uuid: device_uuid });
    if (!device) {
      // if device not found, create a new device
      device = new Device({ uuid: device_uuid, name: device_name });
    } else {
      // if device found, dissociate it from the old user
      device.userId = null;
    }
    // associate the device with the new user
    device.userId = userId;
    await device.save();
    res.json({
      message: "Device associated successfully",
      device: { uuid: device.uuid, name: device.name },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error associating device" });
  }
};
