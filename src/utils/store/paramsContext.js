import React, { useEffect, useState } from "react";
import { isProd } from "utils/logic/helpers";

import { allParamsByLevel, initialLevelParams } from "./initialState/params";
import { useScoresAPI } from "api";

//for IDE completion
const defaultContext = {
  ...initialLevelParams,
  setParameters: () => {},
  loadedScores: false,
  scores: {},
};
const paramsContext = React.createContext(defaultContext);
export default paramsContext;

export const ParamsCtxProvider = (props) => {
  const [currentParams, setCurrentParams] = useState(initialLevelParams);
  const { loadedScores, scores } = useScoresAPI();

  const currentLevelScores = scores[currentParams.level];

  useEffect(() => {
    if (loadedScores && currentLevelScores.length > 0) {
      if (currentParams.bestTime !== currentLevelScores[0]) {
        setCurrentParams((prevValues) => ({
          ...prevValues,
          bestTime: currentLevelScores[0],
        }));
      }
    }
  }, [currentParams.bestTime, loadedScores, currentLevelScores]);

  const setParameters = (newLevelName) => {
    setCurrentParams(allParamsByLevel[newLevelName]);
    if (!isProd) {
      console.log("PARAMS CONTEXT changing params");
    }
  };

  return (
    <paramsContext.Provider
      value={{
        ...currentParams,
        setParameters,
        loadedScores,
        scores,
      }}>
      {props.children}
    </paramsContext.Provider>
  );
};
