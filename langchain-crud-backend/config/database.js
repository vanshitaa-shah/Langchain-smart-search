import mongoose from "mongoose";

// Database connection
export const connectDatabase = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI;

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🔄 Shutting down gracefully...");
  await mongoose.connection.close();
  console.log("✅ Database connection closed");
  process.exit(0);
});
