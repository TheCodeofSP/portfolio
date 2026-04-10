import { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter.jsx";
import Intro from "./components/common/Intro.jsx";
import "./app.scss";

const THEMES = ["accueillant", "energique", "minimaliste"];

function App() {
  const [theme, setTheme] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");

    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
      setShowIntro(false);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    THEMES.forEach((name) => {
      html.classList.remove(`theme-${name}`);
      body.classList.remove(`theme-${name}`);
    });

    if (theme && THEMES.includes(theme)) {
      html.classList.add(`theme-${theme}`);
      body.classList.add(`theme-${theme}`);
      sessionStorage.setItem("theme", theme);
    }

    return () => {
      THEMES.forEach((name) => {
        html.classList.remove(`theme-${name}`);
        body.classList.remove(`theme-${name}`);
      });
    };
  }, [theme]);

  const handleThemeSelect = (selectedTheme) => {
    if (!THEMES.includes(selectedTheme)) return;

    setTheme(selectedTheme);
    setShowIntro(false);
  };

  const resetIntro = () => {
    sessionStorage.removeItem("theme");
    setTheme(null);
    setShowIntro(true);
  };

  if (showIntro) {
    return <Intro onSelectTheme={handleThemeSelect} />;
  }

  return <AppRouter theme={theme} resetIntro={resetIntro} />;
}

export default App;
