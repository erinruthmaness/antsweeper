import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FaceButton from "Components/Game/Controls/FaceButton";
import CalcScreen from "Components/Game/Controls/CalcScreen";
import styles from "./Controls.module.css";

const Controls = (props) => {
    const [clock, setClock] = useState("off");
    const [clockStarted, setClockStarted] = useState(props.firstClick);

    const startGameHandler = () => {
        setClock(0);
        props.startGame();
    };

    useEffect(() => {
        if (props.firstClick && !clockStarted) {
            setClockStarted(true);
        }
        if (!props.firstClick && clockStarted) {
            setClockStarted(false);
        }
        return () => {};
    }, [props.firstClick, clockStarted]);

    useEffect(() => {
        let timer;
        if (clockStarted && props.inProgress && props.firstClick) {
            timer = setInterval(() => {
                if (clock < 999) {
                    setClock((prevTime) => prevTime + 1);
                }
            }, 1000);
        }
        if (!props.inProgress) {
            clearInterval(timer);
        }
        return () => {
            clearInterval(timer);
        };
    }, [clock, clockStarted, props.firstClick, props.inProgress]);

    const remainingFlags = props.inProgress || clockStarted ? props.flags : "off";
    const timeElapsed = props.inProgress || clockStarted ? clock : "off";

    return (
        <header className={styles.controls}>
            <CalcScreen
                id={"flags"}
                display={remainingFlags}
                role={"progressbar"}
                aria-live={"polite"}
                aria-valuemin={0}
                aria-valuemax={props.maxFlags}
                aria-valuenow={remainingFlags}
            />
            <FaceButton onClick={startGameHandler} face={props.face} />
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
