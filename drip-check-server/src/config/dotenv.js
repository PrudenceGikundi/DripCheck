const dotenv = require("dotenv");

const loadEnv = () => {
  dotenv.config();
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("❌ Missing required environment variables in .env file");
    process.exit(1);
  }
};

module.exports = loadEnv;