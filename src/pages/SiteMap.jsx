import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./legal.scss";

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
    <main className={`legal theme-${theme}`}>
      <section className="legal__container">
        <h1 className="page-title">Plan du site</h1>

        <article className="legal__block">
          <h2>Pages principales</h2>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/projects">Projets</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </article>

        <article className="legal__block">
          <h2>Pages légales</h2>
          <ul>
            <li>
              <Link to="/legal">Mentions légales</Link>
            </li>
            <li>
              <Link to="/privacy">Politique de confidentialité</Link>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default SiteMap;