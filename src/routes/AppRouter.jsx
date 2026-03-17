import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Projects from "../pages/Projects.jsx";
import Skills from "../pages/Skills.jsx";
import Contact from "../pages/Contact.jsx";
import ThemeSwitcher from "../components/FloatingThemeSwitcher.jsx";
import Legal from "../pages/Legal.jsx";
import Privacy from "../pages/Privacy.jsx";
import NotFound from "../pages/NotFound.jsx";
import SiteMap from "../pages/SiteMap.jsx";

const THEME_CLASSES = [
  "theme-accueillant",
  "theme-energique",
  "theme-minimalism",
];

const THEME_FAVICONS = {
  accueillant: "/images/logo/SPAccueillant.svg",
  energique: "/images/logo/SPEnergique.svg",
  minimalism: "/images/logo/SPMinimalism.svg",
};

const updateFavicon = (theme) => {
  const favicon = document.getElementById("favicon");
  if (!favicon) return;

  favicon.href = THEME_FAVICONS[theme] || THEME_FAVICONS.accueillant;
};

const AppRouter = ({ theme, setTheme, resetIntro }) => {
  useEffect(() => {
    if (!theme) return;

    const html = document.documentElement;
    const body = document.body;
    const themeClass = `theme-${theme}`;

    html.classList.remove(...THEME_CLASSES);
    body.classList.remove(...THEME_CLASSES);

    html.classList.add(themeClass);
    body.classList.add(themeClass);

    sessionStorage.setItem("theme", theme);
    updateFavicon(theme);

    return () => {
      html.classList.remove(...THEME_CLASSES);
      body.classList.remove(...THEME_CLASSES);
    };
  }, [theme]);

  return (
    <Router>
      <div className={`app theme-${theme || "accueillant"}`}>
        <Header theme={theme} resetIntro={resetIntro} />

        <main>
          <Suspense fallback={<p>Chargement...</p>}>
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/about" element={<About theme={theme} />} />
              <Route path="/projects" element={<Projects theme={theme} />} />
              <Route path="/skills" element={<Skills theme={theme} />} />
              <Route path="/contact" element={<Contact theme={theme} />} />
              <Route path="/legal" element={<Legal theme={theme} />} />
              <Route path="/privacy" element={<Privacy theme={theme} />} />
              <Route path="*" element={<NotFound theme={theme} />} />
              <Route path="/sitemap" element={<SiteMap theme={theme} />} />
            </Routes>
          </Suspense>
        </main>

        <ThemeSwitcher theme={theme} setTheme={setTheme} />

        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default AppRouter;
