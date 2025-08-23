import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import userRoutes from "./routes/user.route.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);
// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
