import express from "express";
import authMiddleware from "../authmiddleware.js";
import { createSubmission, getEvaluation } from "../controllers/submissionController.js";


const router = express.Router();

router.post("/:attemptId",authMiddleware,createSubmission);
router.get("/evaluation/:submissionId",authMiddleware,getEvaluation);

export default router;