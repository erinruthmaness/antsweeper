import PropTypes from "prop-types";
import { useGameContext } from "utils/hooks";
import FaceButton from "Components/Game/Controls/FaceButton";
import CalcScreen from "Components/Game/Controls/CalcScreen";
import styles from "./Controls.module.css";

const Controls = () => {
  const { gameStatus, boardCtx, roundCtx, paramsCtx } = useGameContext();

  const roundInProgress = roundCtx.ready || roundCtx.started;
  const remainingFlags = roundInProgress ? boardCtx.flags : "off";
  const timeElapsed = roundInProgress ? roundCtx.time : "off";

  return (
    <header className={styles.controls} role="status">
      <div id="game-status" data-testid="game-status" className={styles.controls__status}>
        {gameStatus}
      </div>
      <CalcScreen
        id={"flags"}
        display={remainingFlags}
        role={"progressbar"}
        aria-live={"polite"}
        aria-valuemin={0}
        aria-valuemax={paramsCtx.ants}
        aria-valuenow={remainingFlags}
      />
      <FaceButton face={boardCtx.face} />
      <CalcScreen
        id={"timer"}
        display={timeElapsed}
        role={"timer"}
        aria-live={"off"}
        aria-roledescription={`elapsed time is ${timeElapsed} seconds`}
      />
    </header>
  );
};

Controls.propTypes = {
  face: PropTypes.arrayOf(PropTypes.string),
  firstClick: PropTypes.bool,
  flags: PropTypes.number,
  maxFlags: PropTypes.number,
  inProgress: PropTypes.bool,
  startGame: PropTypes.func,
};

export default Controls;
