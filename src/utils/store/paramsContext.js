import React, { useState } from "react";
import { defaultParams, default as getParams } from "./initialState/params";

//for IDE completion
const defaultContext = {
    ...defaultParams,
    setParameters: (string) => {},
};
const paramContext = React.createContext(defaultContext);
export default paramContext;

export const ParamCtxProvider = (props) => {
    const [params, setParams] = useState(defaultParams);

    const setParameters = (paramString) => {
        setParams(getParams(paramString));
        console.log("PARAMS CONTEXT changing params");
    };

    return (
        <paramContext.Provider
            value={{
                ...params,
                setParameters,
            }}>
            {props.children}
        </paramContext.Provider>
    );
};
