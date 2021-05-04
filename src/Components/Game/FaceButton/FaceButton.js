import styles from "./FaceButton.module.css";

const FaceButton = (props) => {
//   const clickHandler = () => {
    // currentFace = ["0xD83D, 0xDE31"];
    // props.startGame();
//   };
  return (
    <button
      className={`windows95 ${styles.control_button}`}
      onClick={props.onClick}
    >
      {String.fromCharCode(props.face[0], props.face[1])}
    </button>
  );
};

export default FaceButton;
