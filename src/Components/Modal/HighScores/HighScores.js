import { useGetScores } from "api";
import { LEVELS } from "utils/strings";
import { capitalizeFirstLetter } from "utils/logic/helpers";

const HighScores = () => {
  const { loadedScores, scores } = useGetScores();

  const makeListContents = (LEVEL_STRING) => {
    if (!loadedScores) {
      return <li>Loading...</li>;
    } else if (scores[LEVEL_STRING].length === 0) {
      return <li>No high scores yet for this level!</li>;
    } else {
      return scores[LEVEL_STRING].map((score) => (
        <li key={score.id}>
          {score.name}: {score.score}
        </li>
      ));
    }
  };

  return (
    <>
      {Object.values(LEVELS).map((LEVEL_STRING) => (
        <div key={LEVEL_STRING}>
          <h3 id={`${LEVEL_STRING}-label`}>{capitalizeFirstLetter(LEVEL_STRING)}</h3>
          <ul aria-labelledby={`${LEVEL_STRING}-label`}>{makeListContents(LEVEL_STRING)}</ul>
        </div>
      ))}
    </>
  );
};

export default HighScores;
