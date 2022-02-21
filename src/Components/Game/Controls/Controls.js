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
        // setClockStarted(true);
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

    return (
        <div className={styles.controls}>
            <CalcScreen id={"flags"} display={props.inProgress || clockStarted ? props.flags : "off"} />
            <FaceButton onClick={startGameHandler} face={props.face} />
            <CalcScreen id={"timer"} display={props.inProgress || clockStarted ? clock : "off"} />
        </div>
    );
};

Controls.propTypes = {
    face: PropTypes.arrayOf(PropTypes.string),
    firstClick: PropTypes.bool,
    flags: PropTypes.number,
    inProgress: PropTypes.bool,
    startGame: PropTypes.func,
};

export default Controls;
