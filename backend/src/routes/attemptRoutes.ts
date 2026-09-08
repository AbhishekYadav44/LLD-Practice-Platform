import express from "express";
import  authMiddleware from "../authmiddleware.js";
import { createAttempt } from "../controllers/attemptController.js";

const router = express.Router();

router.post("/", authMiddleware, createAttempt);

export default router;