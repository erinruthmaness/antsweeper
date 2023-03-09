import { useCallback, useEffect, useState } from "react";
import { LEVELS } from "utils/strings";
import { scoresURL } from "./endpoints";

export const scoreObject = {
  level: 0,
  timeInSeconds: 0,
  username: "",
};

const sortScoreList = (scoreList) => scoreList.sort((a, b) => a.score > b.score);

export const useScoresAPI = () => {
  //status
  const [loadedScores, setLoadedScores] = useState(false);
  // const [updatingScores, setUpdatingScores] = useState(false);

  //scores
  const [scoresBeginner, setScoresBeginner] = useState([]);
  const [scoresIntermediate, setScoresIntermediate] = useState([]);
  const [scoresExpert, setScoresExpert] = useState([]);

  const getScores = useCallback(async () => {
    if (loadedScores) return;

    try {
      const res = await fetch(scoresURL);
      const resData = await res.json();

      const jsonScores = resData.reduce(
        (scoreDict, score) => {
          if (score.level === 0) {
            scoreDict.beginner.push(score);
          } else if (score.level === 1) {
            scoreDict.intermediate.push(score);
          } else if (score.level === 2) {
            scoreDict.expert.push(score);
          } else {
            console.log("unexpected score item:");
            console.dir(score);
          }

          return scoreDict;
        },
        { beginner: [], intermediate: [], expert: [] }
      );

      setScoresBeginner(sortScoreList(jsonScores.beginner));
      setScoresIntermediate(sortScoreList(jsonScores.intermediate));
      setScoresExpert(sortScoreList(jsonScores.expert));
    } catch (err) {
      console.error(err);
    }
    setLoadedScores(true);
  }, [loadedScores]);

  const postScore = async (newScoreObject) => {
    try {
      const res = await fetch(scoresURL, {
        method: "POST",
        body: newScoreObject,
      });
      const resData = await res.json();

      console.log("posted score", resData);
      getScores();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("time to get scores")
    getScores();
  }, []);

  return {
    getScores,
    loadedScores,
    scores: {
      [LEVELS.BEGINNER]: scoresBeginner,
      [LEVELS.INTERMEDIATE]: scoresIntermediate,
      [LEVELS.EXPERT]: scoresExpert,
    },
    postScore,
  };
};
