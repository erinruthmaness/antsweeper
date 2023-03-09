import { LEVELS } from "utils/strings";

export const getDisplayableUserStats = (stats) => {
  let result = {};

  Object.values(LEVELS).forEach((level) => {
    result[level] = {
      //should calculate these way later lol
      displayStats: [
        `Games played: ${stats[level].total || 0}`,
        `Games won: ${stats[level].wins || 0}`,
        `Win percentage: ${Math.round(stats[level].wins / stats[level].total) || 0}%`,
        `Longest winning streak: ${stats[level].winStreak || 0}`,
        `Longest losing streak: ${stats[level].lossStreak || 0}`,
        `Current: ${stats[level].currentWins || 0} wins`,
      ],
      ...stats[level],
    };
  });

  return result;
};

const initialUserLevelStats = {
  total: 0,
  wins: 0,
  winStreak: 0,
  lossStreak: 0,
  currentWins: 0,
  currentLosses: 0,
  bestTimes: [],
};

export const initialUserStats = {
  [LEVELS.BEGINNER]: initialUserLevelStats,
  [LEVELS.INTERMEDIATE]: initialUserLevelStats,
  [LEVELS.EXPERT]: initialUserLevelStats,
};
