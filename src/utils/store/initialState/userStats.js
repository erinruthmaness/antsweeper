import PropTypes from "prop-types";
import { levels } from "utils/logic/helpers";

export const getUserStats = (stats) => {
    let result = {};

    Object.keys(levels).forEach((level) => {
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

getUserStats.propTypes = {
    stats: PropTypes.shape({
        beginner: statShape,
        intermediate: statShape,
        expert: statShape,
    }),
};

export default getUserStats;

const defaultStatShape = {
    total: 0,
    wins: 0,
    winStreak: 0,
    lossStreak: 0,
    currentWins: 0,
    currentLosses: 0,
    bestTimes: [],
};

export const defaultUserStats = getUserStats({
    beginner: defaultStatShape,
    intermediate: defaultStatShape,
    expert: defaultStatShape,
});
