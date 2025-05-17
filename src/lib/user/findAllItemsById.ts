import { Quiz, Result } from "../../models";
import mongoose from "mongoose";

export const findAllItemsById = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "desc",
  searchQuery = "",
  status = "",
  category = "",
  difficulty = "",
  duration = 1,
  userId = "",
}) => {
  try {
    // Sort filter
    const sortFilter: [string, 1 | -1][] = [
      [sortBy, sortType === "desc" ? -1 : 1],
    ];

    const searchCondition: any = {};
    let userParticipatedQuizzes: Set<string> = new Set();

    if (userId) {
      const participatedQuizzes = await Result.distinct("quiz", {
        user: userId,
      });
      userParticipatedQuizzes = new Set(
        participatedQuizzes.map((id: mongoose.Types.ObjectId) => id.toString())
      );

      searchCondition.user = userId;
    }

    if (searchQuery) {
      searchCondition.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    if (status) {
      searchCondition.status = status;
    }

    if (category) {
      searchCondition.category = category;
    }

    if (difficulty) {
      searchCondition.difficulty = difficulty;
    }

    // if (duration) {
    //   searchCondition.duration = duration;
    // }

    // Fetch data with the search condition
    const quizzes = await Quiz.find(searchCondition)
      .select("-__v")
      .sort(sortFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "questions",
        select: "-__v",
      });

    // Count participants for each quiz and Add isParticipated field based on whether quizId exists in participatedQuizzes
    const quizzesWithParticipationStatus = await Promise.all(
      quizzes.map(async (quiz) => {
        const totalParticipants = await Result.countDocuments({
          quiz: quiz._id,
        });

        return {
          ...quiz.toObject(),
          isParticipated: userParticipatedQuizzes.has(quiz._id.toString()),
          totalParticipants,
        };
      })
    );

    // Fetch total count of documents with the search condition
    const totalItems = await Quiz.countDocuments(searchCondition);

    return { data: quizzesWithParticipationStatus, totalItems };
  } catch (error) {
    console.error("Error in findAllItems:", error);
    throw error;
  }
};
