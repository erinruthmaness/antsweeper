import PropTypes from "prop-types";
import { levels } from "utils/logic/helpers";

const getParams = (levelString) => {
    return { ...levels[levelString] };
};

getParams.propTypes = {
    level: PropTypes.oneOf(["beginner", "intermediate", "expert"]),
};

export default getParams;

export const defaultParams = getParams("beginner");
