import React, { useState } from "react";

//for IDE completion
const defaultContext = {
  display: null,
  hide: () => {},
  show: () => {},
};
const overlayContext = React.createContext(defaultContext);
export default overlayContext;

export const OverlayCtxProvider = (props) => {
  const [overlayState, setOverlayState] = useState(false);

  const hide = () => {
    setOverlayState(false);
    console.log("OVERLAY CONTEXT hiding overlay");
  };

  const show = () => {
    setOverlayState(true);
    console.log("OVERLAY CONTEXT showing overlay");
  };

  return (
    <overlayContext.Provider
      value={{
        display: overlayState,
        hide: hide,
        show: show
      }}
    >
      {props.children}
    </overlayContext.Provider>
  );
};
