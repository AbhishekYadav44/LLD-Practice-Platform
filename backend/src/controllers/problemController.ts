import problemModel from "../models/problem.js";
import type { Request,Response } from "express";


const getProblems = async(req: Request, res: Response) => {

    try {
        const problems = await problemModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            problems,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to fetch problems",
            error: error.message,
        });
    }

}


export default getProblems