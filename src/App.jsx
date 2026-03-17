import { useEffect, useState } from "react";
import AppRouter from "./routes/AppRouter.jsx";
import Intro from "./components/Intro.jsx";
import "./app.scss";

function App() {
  const [theme, setTheme] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      setShowIntro(false);
    }
  }, []);

  const handleThemeSelect = (selectedTheme) => {
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

  return (
    <AppRouter theme={theme} setTheme={setTheme} resetIntro={resetIntro} />
  );
}

export default App;