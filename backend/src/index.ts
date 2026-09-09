import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { connect } from "mongoose";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js"
import problemRoutes from "./routes/problemRoutes.js"
import attemptRoutes from "./routes/attemptRoutes.js"
import submissionRoutes from "./routes/submissionRoutes.js"
dotenv.config();

const app = express();

app.use(cors({
    origin : "http://localhost:3000"
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "LLD Practice Platform API is running",
    });
});

app.use("/api/auth", userRoutes)
app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/submissions", submissionRoutes);

connectDB()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});