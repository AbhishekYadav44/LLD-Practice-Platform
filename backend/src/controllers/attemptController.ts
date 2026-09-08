import type { Request, Response } from "express";
import attemptModel from "../models/attempt.js";
import problemModel from "../models/problem.js";

interface AuthRequest extends Request {
  userId?: string;
}

const createAttempt = async (req: AuthRequest, res: Response) => {
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

export { createAttempt };