import { useEffect, useMemo, useRef, useState } from "react";
import "./homeSloganEffect.scss";

const HomeSloganEffect = ({
  text = "",
  speed = 50,
  startDelay = 500,
  theme = "accueillant",
  showCursor = true,
  keepCursorAtEnd = false,
  onComplete,
}) => {
  const isMinimalTheme = theme === "minimaliste";
  const isTerminalTheme = theme === "energique";

  const [displayedText, setDisplayedText] = useState(isMinimalTheme ? text : "");
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (isMinimalTheme) {
      setDisplayedText(text);
      setCurrentChar(text.length);
      setIsTyping(false);

      if (onCompleteRef.current) {
        onCompleteRef.current();
      }

      return;
    }

    setDisplayedText("");
    setCurrentChar(0);
    setIsTyping(false);

    return () => clearTimeout(timeoutRef.current);
  }, [text, isMinimalTheme]);

  useEffect(() => {
    if (isMinimalTheme || !text) return;

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
  }, [currentChar, text, speed, startDelay, isMinimalTheme]);

  const shouldShowCursor =
    !isMinimalTheme && showCursor && (isTyping || keepCursorAtEnd);

  const { textStart, textEnd } = useMemo(() => {
    if (!displayedText) {
      return { textStart: "", textEnd: "" };
    }

    const lastSpaceIndex = displayedText.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
      return {
        textStart: "",
        textEnd: displayedText,
      };
    }

    return {
      textStart: displayedText.slice(0, lastSpaceIndex + 1),
      textEnd: displayedText.slice(lastSpaceIndex + 1),
    };
  }, [displayedText]);

  return (
    <span className={`slogan-effect slogan-effect--${theme}`}>
      <span className="slogan-effect__line">
        {isTerminalTheme && (
          <span className="slogan-effect__prompt" aria-hidden="true">
            &gt;
          </span>
        )}

        <span className="slogan-effect__text">
          {textStart}

          <span className="slogan-effect__tail">
            {textEnd}

            {shouldShowCursor && (
              <span className="slogan-effect__cursor" aria-hidden="true" />
            )}
          </span>
        </span>
      </span>
    </span>
  );
};

export default HomeSloganEffect;