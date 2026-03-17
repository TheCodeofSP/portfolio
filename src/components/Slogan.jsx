import React, { useEffect, useState } from "react";
import SloganEffect from "./SloganEffect.jsx";
import "./slogan.scss";

const cursorThemes = ["accueillant", "energique"];

const Slogan = ({
  text,
  theme = "accueillant",
  speed = 50,
  startDelay = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  if (!text) return null;

  return (
    <p className={`slogan ${isVisible ? "visible" : ""}`}>
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
