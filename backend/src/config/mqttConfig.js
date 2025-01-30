const mqtt = require("mqtt");

const MQTT_HOST = process.env.MQTT_HOST || "mqtt://localhost:1883";

const mqttClient = mqtt.connect(MQTT_HOST);

// Gestionnaire de messages MQTT
mqttClient.on("connect", () => {
  console.log("🟢 Connected to MQTT broker");

  mqttClient.subscribe("aquarium/device/+/+", (err) => {
    if (!err) console.log("✅ Subscribed to aquarium/device/+/+");
  });
});

mqttClient.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

// Souscription plus large aux topics
mqttClient.subscribe("aquarium/#", (err) => {
  if (!err) {
    console.log("✅ Subscribed to topics aquarium/#");
  } else {
    console.error("❌ Subscription error:", err);
  }
});

// Gestionnaire de messages avec réponses
mqttClient.on("message", async (topic, message) => {
  console.log(`📨 Topic reçu: ${topic}`);

  const topicParts = topic.split("/");
  const deviceId = topicParts[2];
  const messageType = topicParts[3];

  try {
    const payload = JSON.parse(message.toString());
    console.log("📦 Payload:", payload);

    switch (messageType) {
      case "command":
        // Réponse à une commande
        mqttClient.publish(
          `aquarium/device/${deviceId}/status`,
          JSON.stringify({
            status: "received",
            command: payload,
            timestamp: Date.now(),
          })
        );
        break;

      case "data":
        // Traitement des données
        console.log(`📊 Données reçues de ${deviceId}:`, payload);
        break;
    }
  } catch (error) {
    console.error("❌ Erreur:", error);
    mqttClient.publish(
      `aquarium/device/${deviceId}/status`,
      JSON.stringify({
        status: "error",
        message: error.message,
        timestamp: Date.now(),
      })
    );
  }
});

module.exports = mqttClient;
