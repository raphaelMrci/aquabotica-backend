const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
});

module.exports = mongoose.model("Device", DeviceSchema);
