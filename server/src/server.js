// server.js (ESM)
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// --- connect DB (if using Mongo) ---
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Mongo connected");
  }).catch(err => {
    console.error("Mongo error:", err.message);
  });
}

// --- simple health check to verify server is hit ---
app.get("/health", (_req, res) => res.json({ ok: true }));

// --- MOUNT HERE (this is the key line) ---
app.use("/api/auth", authRouter); // --> exposes POST /api/auth/signup
app.use("/api/tasks", taskRouter); // --> exposes task CRUD operations

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
