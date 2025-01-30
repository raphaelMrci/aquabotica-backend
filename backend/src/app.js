const express = require("express");
const mqttClient = require("./config/mqttConfig");
const authRoutes = require("./routes/authRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const sensorRoutes = require("./routes/sensorRoutes");

const app = express();
app.use(express.json());

// Amélioration des logs MQTT
mqttClient.on("connect", () => {
  console.log("🟢 Connecté au broker MQTT");
});

mqttClient.on("error", (err) => {
  console.error("🔴 Erreur MQTT:", err);
});

// Souscription plus large aux topics
mqttClient.subscribe("aquarium/#", (err) => {
  if (!err) {
    console.log("✅ Souscrit aux topics aquarium/#");
  } else {
    console.error("❌ Erreur de souscription:", err);
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

app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/sensor", sensorRoutes);
app.use("/alive", (req, res) => {
  res.send("I'm alive!");
});

module.exports = app;
