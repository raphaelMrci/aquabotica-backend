const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/smart-aquarium";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB with URI: ", MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //amoureux de caca merde <3 :3
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
