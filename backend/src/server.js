import express from "express";
import { ENV } from "../config/env.js";
import { inngest, functions } from "../config/inngest.js";
import { serve } from "inngest/express";
import { connectDB } from "../config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());
app.use(express.json());


app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/", (req, res) => {
  res.send("Hello World from Vercel + Express 🚀");
});


if (ENV.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(ENV.PORT, () => {
        console.log(`Server running at http://localhost:${ENV.PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
} else {

  connectDB().catch((err) => {
    console.error("Failed to connect DB on Vercel:", err);
  });
}


export default app;
