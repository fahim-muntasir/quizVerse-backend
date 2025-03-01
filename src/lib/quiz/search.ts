import { Quiz } from "../../models";

export const searchItems = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "desc",
  searchQuery = "",
  status = "",
  category = "",
  difficulty = "",
  duration = 1,
}) => {
  try {
    const sortFilter: [string, 1 | -1][] = [[sortBy, sortType === "desc" ? -1 : 1]];

    // Create a search condition based on the title or description
    const searchCondition = {
      $and: [
        searchQuery
          ? {
              $or: [
                { title: { $regex: new RegExp(searchQuery, "i") } },
                { description: { $regex: new RegExp(searchQuery, "i") } },
              ],
            }
          : {},
        status ? { status } : {},
        category ? { category } : {},
        difficulty ? { difficulty } : {},
        // duration ? { duration } : {},
      ],
    };

    // Use the search condition in the query
    const data = await Quiz.find(searchCondition)
      .select("-__v")
      .sort(sortFilter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "questions",
        select: "-__v"
      });

    // Fetch total count of documents with the search condition
    const totalItems = await Quiz.countDocuments(searchCondition);

    return { data, totalItems };
  } catch (error) {
    throw error;
  }
};
