import { Response, Request, NextFunction } from "express";
import { topParticipants } from "../../../../lib/leaderboard";
import { successResponse } from "../../../../utils/responseHelper";

export const getTopParticipantsQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const participants = await topParticipants({ limit: 10 });

    // Send response
    successResponse(res, participants, "Top participants", 200);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    next(error);
  }
};
