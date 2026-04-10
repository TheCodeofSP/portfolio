import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

const NotFound = ({ theme }) => {
  const seo = {
    title: "404 | Page introuvable | TheCodeOfSP",
    description:
      "La page demandée est introuvable. Retournez à l'accueil, découvrez les projets ou contactez TheCodeOfSP.",
  };

  useEffect(() => {
    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, []);

  return (
    <main className={`not-found theme-${theme}`}>
      <section className="not-found__container">
        <p className="not-found__eyebrow">Erreur 404</p>

        <div className="not-found__badge" aria-hidden="true">
          404
        </div>

        <h1 className="page-title not-found__title">Page introuvable</h1>

        <p className="not-found__subtitle">
          Oups. Cette page n’existe pas ou n’est plus disponible.
        </p>

        <p className="not-found__text">
          Tu peux revenir à l’accueil, consulter mes projets ou me contacter
          directement si tu cherchais une information précise.
        </p>

        <div className="not-found__actions">
          <Link to="/" className="not-found__button">
            Retour à l’accueil
          </Link>

          <Link
            to="/projects"
            className="not-found__button not-found__button--ghost"
          >
            Voir les projets
          </Link>

          <Link
            to="/contact"
            className="not-found__button not-found__button--ghost"
          >
            Me contacter
          </Link>
        </div>

        <div className="not-found__card">
          <h2>Tu cherchais peut-être :</h2>
          <ul>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/projects">Mes projets</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/legal">Mentions légales</Link>
            </li>
            <li>
              <Link to="/privacy">Confidentialité</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default NotFound;