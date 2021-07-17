import React, { useState } from "react";
import levels from "./initialState/paramLevels";
import { RoundCtxProvider } from "./roundContext";
import { WindowCtxProvider } from "./windowContext";

//for IDE completion
const defaultContext = {
  rows: null,
  cols: null,
  ants: null,
  setParameters: (params) => {},
};
const paramContext = React.createContext(defaultContext);
export default paramContext;

export const ParamCtxProvider = (props) => {
  const [params, setParams] = useState(levels.beginner);

  const setParameters = (newParam) => {
    setParams(newParam);
    console.log("PARAMS CONTEXT changing params");
  };

  return (
    <paramContext.Provider
      value={{
        ...params,
        setParameters: setParameters,
      }}
    >
      <RoundCtxProvider>
        <WindowCtxProvider>
        {props.children}
        </WindowCtxProvider>
      </RoundCtxProvider>
    </paramContext.Provider>
  );
};
