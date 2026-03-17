import { useEffect, useRef, useState } from "react";
import "./sloganEffect.scss";

const SloganEffect = ({
  text = "",
  speed = 50,
  startDelay = 500,
  theme = "accueillant",
  showCursor = true,
  keepCursorAtEnd = false,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    setDisplayedText("");
    setCurrentChar(0);
    setIsTyping(false);

    return () => clearTimeout(timeoutRef.current);
  }, [text]);

  useEffect(() => {
    if (!text) return;

    if (currentChar === 0) {
      setIsTyping(true);
    }

    if (currentChar >= text.length) {
      setIsTyping(false);

      if (onCompleteRef.current) {
        onCompleteRef.current();
      }

      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayedText(text.slice(0, currentChar + 1));
      setCurrentChar((prev) => prev + 1);
    }, currentChar === 0 ? startDelay : speed);

    return () => clearTimeout(timeoutRef.current);
  }, [currentChar, text, speed, startDelay]);

  const isTerminalTheme = theme === "energique";
  const shouldShowCursor = showCursor && (isTyping || keepCursorAtEnd);

  return (
    <span className={`slogan-effect slogan-effect--${theme}`}>
      <span className="slogan-effect__line">
        {isTerminalTheme && (
          <span className="slogan-effect__prompt" aria-hidden="true">
            &gt;
          </span>
        )}

        <span className="slogan-effect__text">{displayedText}</span>

        {shouldShowCursor && (
          <span className="slogan-effect__cursor" aria-hidden="true" />
        )}
      </span>
    </span>
  );
};

export default SloganEffect;