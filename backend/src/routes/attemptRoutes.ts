import express from "express";
import  authMiddleware from "../authmiddleware.js";
import { createAttempt, getAttemptHistory } from "../controllers/attemptController.js";
import { getTrailingCommentRanges } from "typescript/unstable/ast";

const router = express.Router();

router.post("/", authMiddleware, createAttempt);
router.get("/history", authMiddleware, getAttemptHistory);

export default router;