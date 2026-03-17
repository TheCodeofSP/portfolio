import { useState } from "react";
import "./projectCard.scss";

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  if (!project) return null;

  const toggleCard = () => {
    setFlipped((prev) => !prev);
  };

  const imageSrc = project.image
    ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`
    : "";

  const mainStack = Array.isArray(project.stackPrincipale)
    ? project.stackPrincipale.slice(0, 4)
    : [];

  const impactTags = Array.isArray(project.impactTags)
    ? project.impactTags.slice(0, 3)
    : [];

  const discreetInfos = [
    ...new Set([
      ...(project.languages || []),
      ...(project.frameworks || []),
      ...(project.outilsDev || []).slice(0, 4),
    ]),
  ].slice(0, 8);

  const frontObjective = project.objectif || project.summary || "";
  const frontResult = project.clientBenefit || project.impact || "";

  return (
    <article
      className={`project-card ${flipped ? "is-flipped" : ""}`}
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="project-card__inner">
        <section className="project-card__front" aria-label="Vue principale du projet">
          {imageSrc && (
            <figure className="project-card__image">
              <img
                src={imageSrc}
                alt={project.alt || `Screenshot du projet ${project.title}`}
              />
              <span
                className="project-card__image-overlay"
                aria-hidden="true"
              />
            </figure>
          )}

          <div className="project-card__body">
            <header className="project-card__header">
              <h3
                id={`project-title-${project.id}`}
                className="project-card__title"
              >
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="project-card__subtitle">{project.subtitle}</p>
              )}
            </header>

            <div className="project-card__content">
              {frontObjective && (
                <section className="project-card__block" aria-label="Objectif">
                  <p className="project-card__label">Objectif</p>
                  <p className="project-card__text project-card__text--strong">
                    {frontObjective}
                  </p>
                </section>
              )}

              {impactTags.length > 0 && (
                <section className="project-card__block" aria-label="Points clés">
                  <p className="project-card__label">Points clés</p>
                  <ul className="project-card__tags" aria-label="Liste des points clés">
                    {impactTags.map((tag, index) => (
                      <li
                        key={`${project.id}-impact-${tag}-${index}`}
                        className="impact-tag"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {frontResult && (
                <section className="project-card__result" aria-label="Bénéfice">
                  <p className="project-card__label">Bénéfice</p>
                  <p className="project-card__text">{frontResult}</p>
                </section>
              )}
            </div>

            <footer className="project-card__footer">
              <div className="project-card__actions">
                {project.projet && (
                  <a
                    href={project.projet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    Voir le projet
                  </a>
                )}

                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={toggleCard}
                  aria-pressed={flipped}
                  aria-label={`Afficher la vue technique du projet ${project.title}`}
                >
                  Vue technique
                </button>
              </div>
            </footer>
          </div>
        </section>

        <section className="project-card__back" aria-label="Vue technique du projet">
          <div className="project-card__body">
            <header className="project-card__header">
              <h3 className="project-card__title">{project.title}</h3>
            </header>

            <div className="project-card__content">
              {project.description && (
                <section className="project-card__block" aria-label="Présentation">
                  <p className="project-card__label">Présentation</p>
                  <p className="project-card__text">{project.description}</p>
                </section>
              )}

              {mainStack.length > 0 && (
                <section className="project-card__block" aria-label="Stack principale">
                  <p className="project-card__label">Stack principale</p>
                  <ul className="project-card__tags" aria-label="Liste des technologies principales">
                    {mainStack.map((tech, index) => (
                      <li
                        key={`${project.id}-${tech}-${index}`}
                        className="tech-tag"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {discreetInfos.length > 0 && (
                <section className="project-card__meta" aria-label="Autres éléments">
                  <p className="project-card__meta-label">Autres éléments</p>
                  <p className="project-card__meta-text">
                    {discreetInfos.join(" · ")}
                  </p>
                </section>
              )}
            </div>

            <footer className="project-card__footer">
              <div className="project-card__actions">
                {project.projet && (
                  <a
                    href={project.projet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    Voir le projet
                  </a>
                )}

                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                    aria-label={`Voir le code source du projet ${project.title}`}
                  >
                    Code source
                  </a>
                )}

                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={toggleCard}
                  aria-pressed={flipped}
                  aria-label={`Revenir à la vue principale du projet ${project.title}`}
                >
                  Retour
                </button>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </article>
  );
}