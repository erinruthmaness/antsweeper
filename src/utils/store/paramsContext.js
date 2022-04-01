import React, { useState } from "react";
import { defaultParams, default as getParams } from "./initialState/params";

//for IDE completion
const defaultContext = {
    ...defaultParams,
    setParameters: (string) => {},
};
const paramsContext = React.createContext(defaultContext);
export default paramsContext;

export const ParamsCtxProvider = (props) => {
    const [params, setParams] = useState(defaultParams);

    const setParameters = (paramString) => {
        setParams(getParams(paramString));
        console.log("PARAMS CONTEXT changing params");
    };

    return (
        <paramsContext.Provider
            value={{
                ...params,
                setParameters,
            }}>
            {props.children}
        </paramsContext.Provider>
    );
};
