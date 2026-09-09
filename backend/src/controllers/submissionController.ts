import type { Request, Response } from "express";
import attemptModel from "../models/attempt.js";
import submissionModel from "../models/submission.js";
import evaluationModel from "../models/evaluation.js";
import RuleEvaluator from "../evaluators/ruleEvaluators.js";
import AIEvaluator from "../evaluators/aiEvaluators.js";
interface AuthRequest extends Request {
    userId?: string;
}

const createSubmission = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { attemptId } = req.params as { attemptId: string };
        const { content } = req.body;

        if (
            !content ||
            !content.includes("Classes:") ||
            !content.includes("Responsibilities:") ||
            !content.includes("Relationships:")
        ) {
            return res.status(400).json({
                message: "Please complete the main LLD design sections before submitting.",
            });
        }

        if (!attemptId) {
            return res.status(400).json({
                message: "attemptId required",
            });
        }

        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (!content) {
            return res.status(400).json({
                message: "Submission content is required",
            });
        }


        const attempt = await attemptModel.findById(attemptId);

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found",
            });
        }


        if (attempt.userId.toString() !== req.userId) {
            return res.status(403).json({
                message: "You cannot submit for this attempt",
            });
        }


        const submission = await submissionModel.create({
            attemptId,
            content,
        });

        attempt.status = "Evaluating";
        await attempt.save();



        try {
            const evaluator = new AIEvaluator();

            const result = await evaluator.evaluate(content);

            const evaluation = await evaluationModel.create({
                submissionId: submission._id,
                overallScore: result.overallScore,
                summary: result.summary,
                strengths: result.strengths,
                improvements: result.improvements,
            });

            attempt.status = "Completed";
            await attempt.save();

            return res.status(201).json({
                message: "Submission evaluated successfully",
                submission,
                evaluation,
            });
        } catch (error: any) {
            attempt.status = "Failed";
            await attempt.save();

            return res.status(500).json({
                message: "Submission saved but evaluation failed",
                submission,
                error: error.message,
            });
        }


    } catch (error: any) {
        return res.status(500).json({
            message: "Submission evaluation failed",
            error: error.message,
        });
    }
};
const getEvaluation = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { submissionId } = req.params as {
            submissionId: string;
        };

        const submission = await submissionModel.findById(
            submissionId
        );

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found",
            });
        }

        const attempt = await attemptModel.findById(
            submission.attemptId
        );

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found",
            });
        }

        if (attempt.userId.toString() !== req.userId) {
            return res.status(403).json({
                message: "You cannot access this evaluation",
            });
        }

        const evaluation = await evaluationModel.findOne({
            submissionId,
        });

        if (!evaluation) {
            return res.status(404).json({
                message: "Evaluation not found",
            });
        }

        return res.status(200).json({
            evaluation,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to fetch evaluation",
            error: error.message,
        });
    }
};
export { createSubmission, getEvaluation };