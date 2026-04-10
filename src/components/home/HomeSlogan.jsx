import React from "react";
import HomeSloganEffect from "./HomeSloganEffect.jsx";
import "./homeSlogan.scss";

const cursorThemes = ["accueillant", "energique"];

const HomeSlogan = ({
  text,
  theme = "accueillant",
  speed = 50,
  startDelay = 0,
}) => {
  if (!text) return null;

  return (
    <p className="slogan visible">
      <span className="slogan__title">
        <HomeSloganEffect
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

export default React.memo(HomeSlogan);