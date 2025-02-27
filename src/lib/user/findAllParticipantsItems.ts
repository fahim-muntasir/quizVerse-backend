import { Quiz } from "../../models";
import { Result } from "../../models";

export const findAllParticipantsItems = async ({
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

    if (userId) {
      const participatedQuizzes = await Result.distinct("quiz", { user: userId });
      searchCondition._id = { $in: participatedQuizzes };
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

    // Log the search condition for debugging
    console.log("Search Condition:", searchCondition);

    // Fetch data with the search condition
    const data = await Quiz.find(searchCondition)
      .select("-__v")
      .sort(sortFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "questions",
        select: "-__v",
      });

    // Log the fetched data for debugging
    console.log("Fetched Data:", data);

    // Fetch total count of documents with the search condition
    const totalItems = await Quiz.countDocuments(searchCondition);

    return { data, totalItems };
  } catch (error) {
    console.error("Error in findAllItems:", error);
    throw error;
  }
};
