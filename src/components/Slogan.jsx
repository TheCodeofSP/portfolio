import React from "react";
import SloganEffect from "./SloganEffect.jsx";
import "./slogan.scss";

const cursorThemes = ["accueillant", "energique"];

const Slogan = ({
  text,
  theme = "accueillant",
  speed = 50,
  startDelay = 0,
}) => {
  if (!text) return null;

  return (
    <p className="slogan visible">
      <span className="slogan__title">
        <SloganEffect
          text={text}
          theme={theme}
          speed={speed}
          startDelay={startDelay}
          showCursor={cursorThemes.includes(theme)}
          keepCursorAtEnd={cursorThemes.includes(theme)}
        />
      </span>
    </p>
  );
};

export default React.memo(Slogan);