import type { Request, Response } from "express";
import attemptModel from "../models/attempt.js";
import problemModel from "../models/problem.js";
import submissionModel from "../models/submission.js";
import evaluationModel from "../models/evaluation.js";

interface AuthRequest extends Request {
    userId?: string;
}

const createAttempt = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { problemId } = req.body;

        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (!problemId) {
            return res.status(400).json({
                message: "Problem ID is required",
            });
        }

        const problem = await problemModel.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        const attempt = await attemptModel.create({
            userId: req.userId,
            problemId,
            status: "Started",
        });

        return res.status(201).json({
            message: "Attempt started successfully",
            attempt,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to create attempt",
            error: error.message,
        });
    }
};

const getAttemptById = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { attemptId } = req.params as {
            attemptId: string;
        };

        const attempt = await attemptModel
            .findOne({
                _id: attemptId,
                userId: req.userId,
            })
            .populate(
                "problemId",
                "title description difficulty requirements"
            );

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found",
            });
        }

        return res.status(200).json({
            attempt,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to fetch attempt",
            error: error.message,
        });
    }
};

const getAttemptHistory = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const attempts = await attemptModel
            .find({ userId: req.userId })
            .populate("problemId", "title difficulty")
            .sort({ createdAt: -1 });

        const history = await Promise.all(
            attempts.map(async (attempt) => {
                const submission = await submissionModel
                    .findOne({ attemptId: attempt._id })
                    .sort({ createdAt: -1 });

                let evaluation = null;

                if (submission) {
                    evaluation = await evaluationModel.findOne({
                        submissionId: submission._id,
                    });
                }

                return {
                    attemptId: attempt._id,
                    problem: attempt.problemId,
                    status: attempt.status,
                    score: evaluation?.overallScore ?? null,
                    submittedAt:
                        submission?.submittedAt ?? null,
                };
            })
        );

        return res.status(200).json({
            history,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to fetch attempt history",
            error: error.message,
        });
    }
};

export {
    createAttempt,
    getAttemptById,
    getAttemptHistory,
};