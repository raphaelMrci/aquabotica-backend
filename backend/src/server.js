// server.js
require("dotenv").config(); // Load environment variables from .env

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000; // Use PORT from .env if available
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
