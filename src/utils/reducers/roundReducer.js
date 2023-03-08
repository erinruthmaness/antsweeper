import { isProd } from "utils/logic/helpers";
//probably have to do this logic outside of the reducer where the save hook can.. save it
const changeScore = (userStats, level, didWin) => {
  const currentStats = { ...userStats[level] };
  currentStats.total++;
  if (didWin) {
    currentStats.wins++;
    currentStats.currentWins++;
    currentStats.currentLosses = 0;
    if (currentStats.currentWins > currentStats.winStreak) {
      currentStats.winStreak = currentStats.currentWins;
    }
  } else {
    currentStats.currentLosses++;
    currentStats.currentWins = 0;
    if (currentStats.currentLosses > currentStats.lossStreak) {
      currentStats.lossStreak = currentStats.currentLosses;
    }
  }
  return currentStats;
};

const roundReducer = (roundState, action) => {
  let tempState = { ...roundState };
  switch (action.type) {
    case "BOARD_SET":
      if (!isProd) {
        console.log("ROUND REDUCER board set");
      }
      return { ...roundState, ready: true, started: false };
    case "START_ROUND":
      if (!isProd) {
        console.log("ROUND REDUCER start round");
      }
      return { ...roundState, antList: action.payload, started: true };
    case "WON":
      if (!isProd) {
        console.log("ROUND REDUCER won");
      }
      tempState.userStats = changeScore(tempState.userStats, action.level, true);
      return { ...tempState, antList: [], ready: false };
    case "LOST":
      if (!isProd) {
        console.log("ROUND REDUCER lost");
      }
      tempState.userStats = changeScore(tempState.userStats, action.level, false);
      return { ...tempState, antList: [], ready: false };
    case "RESET":
      if (!isProd) {
        console.log("ROUND REDUCER reset");
      }
      return { ...action.payload };
    default:
      return { ...roundState };
  }
};

export default roundReducer;
