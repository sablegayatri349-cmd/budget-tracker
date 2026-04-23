
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS:          45000,
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(`❌  MongoDB connection failed: ${error.message}`);
    console.error(`   Check your MONGO_URI in .env file: ${process.env.MONGO_URI || 'NOT SET'}`);
    process.exit(1);
  }
};

/* ── HANDLE CONNECTION EVENTS AFTER INITIAL CONNECT ── */
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("✅  MongoDB reconnected");
});

/* ── GRACEFUL CLOSE on app shutdown ── */
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔴  MongoDB connection closed on app shutdown");
  process.exit(0);
});

module.exports = connectDB;