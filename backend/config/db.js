import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false; // track connection state

export const connectDB = async () => {
  if (isConnected) {
    // Reuse existing connection
    return;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    throw error; // don't kill process, let Vercel handle retry
  }
};
