import express from "express";
import authMiddleware from "../authmiddleware.js";
import { createSubmission } from "../controllers/submissionController.js";


const router = express.Router();

router.post("/:attemptId",authMiddleware,createSubmission);

export default router;