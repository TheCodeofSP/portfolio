import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./siteMap.scss";

const SiteMap = ({ theme }) => {
  const seo = {
    title: "Plan du site | TheCodeOfSP",
    description:
      "Plan du site TheCodeOfSP : accueil, à propos, projets, contact, mentions légales et confidentialité.",
  };

  useEffect(() => {
    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, []);

  return (
    <main className={`site-map theme-${theme}`}>
      <section className="site-map__container">
        <RevealOnScroll
          as="header"
          className="site-map__header"
          variant="hero"
          delay={0}
        >
          <h1 className="page-title">Plan du site</h1>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={80}>
          <article className="site-map__block">
            <h2>Pages principales</h2>
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/websiteCreations">Création de sites</Link>
              </li>
              <li>
                <Link to="/freelanceDeveloppement">
                  Développement freelance
                </Link>
              </li>
              <li>
                <Link to="/projects">Projets</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </article>
        </RevealOnScroll>

        <RevealOnScroll variant="section" delay={120}>
          <article className="site-map__block">
            <h2>Pages légales</h2>
            <ul>
              <li>
                <Link to="/legal">Mentions légales</Link>
              </li>
              <li>
                <Link to="/privacy">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/sitemap">Plan du site</Link>
              </li>
            </ul>
          </article>
        </RevealOnScroll>
      </section>
    </main>
  );
};

export default SiteMap;
