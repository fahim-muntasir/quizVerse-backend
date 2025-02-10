import { Response, Request, NextFunction } from "express";
import { findSingleItem } from "../../../../lib/result";
import { successResponse } from "../../../../utils/responseHelper";

export const getCheckParticipateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;

  try {
    const result = await findSingleItem({ quizId, userId: req.user?.id || '' });

    const hasParticipated = !!result;

    // Create response with minimal data
    const data = {
      hasParticipated,
      ...(hasParticipated && { _id: result._id })
    };

    // Send response
    successResponse(res, data, "Participation check successful", 200);
  } catch (error) {
    next(error);
  }
};
