const mqtt = require("mqtt");

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://localhost:1883";

const mqttClient = mqtt.connect(MQTT_HOST);

// Gestionnaire de messages MQTT
mqttClient.on("connect", () => {
  console.log("🟢 Connecté au broker MQTT");

  mqttClient.subscribe("aquarium/device/+/+", (err) => {
    if (!err) console.log("✅ Souscription OK");
  });
});

mqttClient.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

module.exports = mqttClient;
