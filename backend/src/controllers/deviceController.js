const Device = require("../models/device");
const User = require("../models/user");

// register the deviceto the new use. Dissociate it from the old user if it was associated with any.
exports.associateDevice = async (req, res) => {
  const { device_uuid, device_name } = req.body;
  // get the user id from the token
  const { userId } = req.device;
  console.log(req.device);
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find the device by uuid
    let device = await Device.findOne({ uuid: device_uuid });
    if (!device) {
      // if device not found, create a new device
      console.log("Device not found, creating new device");
      device = new Device({ uuid: device_uuid, name: device_name });
    } else {
      // check if the device is already associated with the user
      if (user.devices.includes(device._id)) {
        return res.status(400).json({ message: "Device already associated" });
      }

      console.log("Device found");
      // if device found, dissociate it from the old user
      device.userId = null;
      // also check in the users because they have a reference to the device
      let users = await User.find({ devices: device._id });
      // remove the device from the users
      users.forEach(async (user) => {
        user.devices = user.devices.filter(
          (d) => d.toString() !== device._id.toString()
        );
        await user.save();
      });
    }
    // associate the device with the new user
    device.userId = userId;
    // add the device to the user
    user.devices.push(device._id);
    await user.save();
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

exports.dissociateDevice = async (req, res) => {
  const { device_uuid } = req.body;
  // get the user id from the token
  const { userId } = req.device;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find the device by uuid
    let device = await Device.findOne({ uuid: device_uuid });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    // check if the device is associated with the user
    if (!user.devices.includes(device._id)) {
      return res.status(400).json({ message: "Device not associated" });
    }

    // dissociate the device from the user
    device.userId = null;
    user.devices = user.devices.filter(
      (d) => d.toString() !== device._id.toString()
    );
    await user.save();
    await device.save();
    res.json({
      message: "Device dissociated successfully",
      device: { uuid: device.uuid, name: device.name },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error dissociating device" });
  }
};
