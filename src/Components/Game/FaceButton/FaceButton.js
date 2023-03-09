import styles from "./FaceButton.module.css";

const FaceButton = (props) => {
  return (
    <button
      className={styles.faceButton}
      onClick={props.onClick}
    >
      {String.fromCharCode(props.face[0], props.face[1])}
    </button>
  );
};

export default FaceButton;
