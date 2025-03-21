export const getBadge = (rank: number): string => {
  switch (rank) {
    case 1:
      return "Gold Medalist";
    case 2:
      return "Silver Medalist";
    case 3:
      return "Bronze Medalist";
    default:
      return "Achiever";
  }
};