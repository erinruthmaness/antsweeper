import PropTypes from "prop-types";
import { faces } from "imgs/icons";
import { levels } from "utils/logic/helpers";

const getInitialBoard = (levelOBJ) => {
    return {
        board: [],
        level: levelOBJ.level,
        antList: [],
        flags: levelOBJ.ants,
        face: faces.sleeping,
    };
};

getInitialBoard.propTypes = {
    levelOBJ: PropTypes.shape({
        rows: PropTypes.number,
        cols: PropTypes.number,
        ants: PropTypes.number,
        level: PropTypes.oneOf(["beginner", "intermediate", "expert"]),
    }),
};

export default getInitialBoard;

export const defaultBoardState = getInitialBoard(levels.beginner);
