import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import Home from "../pages/Home.jsx";
import Projects from "../pages/Projects.jsx";
import Contact from "../pages/Contact.jsx";
import Legal from "../pages/Legal.jsx";
import Privacy from "../pages/Privacy.jsx";
import NotFound from "../pages/NotFound.jsx";
import SiteMap from "../pages/SiteMap.jsx";
import WebsiteCreation from "../pages/WebsiteCreation.jsx";
import FreelanceDevelopment from "../pages/FreelanceDevelopment.jsx";

const THEME_FAVICONS = {
  accueillant: "/images/logo/SPAccueillant.svg",
  energique: "/images/logo/SPEnergique.svg",
  minimaliste: "/images/logo/SPminimaliste.svg",
};

const updateFavicon = (theme) => {
  const favicon = document.getElementById("favicon");
  if (!favicon) return;

  favicon.href = THEME_FAVICONS[theme] || THEME_FAVICONS.accueillant;
};

const AppRouter = ({ theme, resetIntro }) => {
  useEffect(() => {
    if (!theme) return;
    updateFavicon(theme);
  }, [theme]);

  return (
    <Router>
      <ScrollToTop />

      <div className={`app theme-${theme || "accueillant"}`}>
        <Header theme={theme} resetIntro={resetIntro} />

        <main>
          <Suspense fallback={<p>Chargement...</p>}>
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route
                path="/websiteCreations"
                element={<WebsiteCreation theme={theme} />}
              />
              <Route
                path="/developpement-freelance"
                element={<FreelanceDevelopment theme={theme} />}
              />
              <Route path="/projects" element={<Projects theme={theme} />} />
              <Route path="/contact" element={<Contact theme={theme} />} />
              <Route path="/legal" element={<Legal theme={theme} />} />
              <Route path="/privacy" element={<Privacy theme={theme} />} />
              <Route path="/sitemap" element={<SiteMap theme={theme} />} />
              <Route path="*" element={<NotFound theme={theme} />} />
            </Routes>
          </Suspense>
        </main>

        <Footer theme={theme} />
      </div>
    </Router>
  );
};

export default AppRouter;