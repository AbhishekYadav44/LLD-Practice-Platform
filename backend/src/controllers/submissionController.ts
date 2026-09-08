import type { Request, Response } from "express";
import attemptModel from "../models/attempt.js";
import submissionModel from "../models/submission.js";
import evaluationModel from "../models/evaluation.js";
import RuleEvaluator from "../evaluators/ruleEvaluators.js";
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

  
    const evaluator = new RuleEvaluator();

    const result = await evaluator.evaluate(content);

    
    const evaluation = await evaluationModel.create({
      submissionId: submission._id,
      overallScore: result.overallScore,
      summary: result.summary,
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
    return res.status(500).json({
      message: "Submission evaluation failed",
      error: error.message,
    });
  }
};

export { createSubmission };