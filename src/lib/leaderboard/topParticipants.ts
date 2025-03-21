import { Result } from "../../models";
import { TopParticipantsTypes } from "../../types/participants";
import { getBadge } from "../../utils/participants";

export async function topParticipants({limit = 10}: {limit?: number}): Promise<TopParticipantsTypes[]> {
  try {
    // Fetch leaderboard data from the database
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$user",
          totalMarks: { $sum: "$totalMarks" },
          totalQuizMarks: { $sum: "$totalQuizMarks" },
          totalAttempts: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { totalScore: -1 },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.fullName",
          email: "$user.email",
          avatar: "$user.avatar",
          totalMarks: 1,
          totalAttempts: 1,
          totalQuizMarks: 1,
        },
      },
      {
        $limit: limit,
      },
    ]).exec();

    // Transform the leaderboard data into the desired format
    const participants = leaderboard.map((participant, index) => {
      const participantData: TopParticipantsTypes = {
        ...participant,
        rank: index + 1,
        badge: getBadge(index + 1),
      };

      if (participant.avatar) {
        participantData.avatar = participant.avatar;
      }

      return participantData;
    });

    return participants;
  } catch (error) {
    throw error;
  }
}
