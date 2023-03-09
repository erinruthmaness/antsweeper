import PropTypes from "prop-types";

const statShape = PropTypes.shape({
  total: PropTypes.number,
  wins: PropTypes.number,
  winStreak: PropTypes.number,
  lossStreak: PropTypes.number,
  currentWins: PropTypes.number,
  currentLosses: PropTypes.number,
  bestTimes: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      date: PropTypes.date,
    })
  ),
});

const userStatsShape = {
  beginner: statShape,
  intermediate: statShape,
  expert: statShape,
};
