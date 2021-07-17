import React, { useState } from "react";

//for IDE completion
const defaultContext = {
  overlay: {
    display: null,
    hide: () => {},
    show: () => {},
  },
  dragMove: {
    translate: {
      x: null,
      y: null,
    },
    isDragging: null,
    grab: () => {},
    drag: (e) => {},
    drop: () => {},
  },
  minimize: {
    isMinimized: null,
    down: () => {},
    up: () => {},
  },
};
const windowContext = React.createContext(defaultContext);
export default windowContext;

export const WindowCtxProvider = (props) => {
  //------overlay------
  const [overlayState, setOverlayState] = useState(false);
  const hide = () => {
    setOverlayState(false);
    console.log("WINDOW CONTEXT hiding overlay");
  };
  const show = () => {
    setOverlayState(true);
    console.log("WINDOW CONTEXT showing overlay");
  };
  //------minimize------
  const [isMinimized, setIsMinimized] = useState(false);
  const down = () => {
    setIsMinimized(true);
  };
  const up = () => {
    setIsMinimized(false);
  };
  //------dragMove------
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const grab = () => {
    console.log("WINDOW CONTEXT grabbing");
    setIsDragging(true);
  };
  const drag = (e) => {
    if (isDragging && !isMinimized) {
      console.log("WINDOW CONTEXT is dragging");
      const minMargin = 20;
      if (
        e.clientY > minMargin &&
        e.clientX > minMargin &&
        e.clientX < e.view.innerWidth - minMargin
      ) {
        setTranslate((prevState) => {
          return {
            x: prevState.x + e.movementX,
            y: prevState.y + e.movementY,
          };
        });
      } else {
        setTranslate({
          x: 0,
          y: 0,
        });
        drop();
      }
    }
  };
  const drop = () => {
    console.log("WINDOW CONTEXT dropping");
    setIsDragging(false);
  };

  return (
    <windowContext.Provider
      value={{
        overlay: {
          display: overlayState,
          hide,
          show,
        },
        dragMove: {
          isDragging,
          grab,
          drag,
          drop,
          translate,
        },
        minimize: {
          isMinimized,
          down,
          up,
        },
      }}
    >
      {props.children}
    </windowContext.Provider>
  );
};
