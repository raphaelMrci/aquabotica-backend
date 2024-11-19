exports.sensorData = async (req, res) => {
    const { temperature, pH } = req.body;
    console.log(`Data received from ${req.device.uuid}`);
    res.json({ message: "Data processed" });
};
