import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./homeFeaturedProject.scss";

export default function FeaturedProject({
  projects = [],
  showProject,
  windowLabel = "featured-project",
  layout = "compact",
}) {
  const featuredProjects = useMemo(
    () => projects.filter((project) => project?.featured),
    [projects],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredProjects.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev === featuredProjects.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [featuredProjects.length]);

  if (!featuredProjects.length) return null;

  const project = featuredProjects[currentIndex];

  const imageSrc = project.image
    ? `${import.meta.env.BASE_URL}${project.image.replace(/^\//, "")}`
    : "";

  const shortPoints =
    Array.isArray(project.featuredPoints) && project.featuredPoints.length
      ? project.featuredPoints.slice(0, 2)
      : [
          ...new Set([
            ...(project.impactTags || []),
            ...(project.stackPrincipale || []),
          ]),
        ].slice(0, 2);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProjects.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === featuredProjects.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <article
      className={`featured-project featured-project--${layout} ${
        showProject ? "is-visible" : ""
      }`}
      aria-labelledby={`featured-project-title-${project.id}`}
    >
      <div className="featured-project__body">
        <span className="featured-project__window-label" aria-hidden="true">
          {windowLabel}
        </span>

        <div className="featured-project__intro">
          <h2
            id={`featured-project-title-${project.id}`}
            className="featured-project__title"
          >
            {project.title}
          </h2>

          {project.typeLabel && (
            <p className="featured-project__type">{project.typeLabel}</p>
          )}

          {project.featuredHook && (
            <p className="featured-project__hook">{project.featuredHook}</p>
          )}

          {shortPoints.length > 0 && (
            <ul
              className="featured-project__badges"
              aria-label="Points forts du projet"
            >
              {shortPoints.map((point, index) => (
                <li
                  key={`${project.id}-point-${index}`}
                  className="featured-project__badge"
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        {imageSrc && (
          <figure className="featured-project__visual">
            <img
              src={imageSrc}
              alt={project.alt || `Aperçu du projet ${project.title}`}
              className="featured-project__image"
              fetchPriority="high"
              decoding="async"
              width="1200"
              height="760"
            />

            {featuredProjects.length > 1 && (
              <>
                <button
                  type="button"
                  className="featured-project__nav-button featured-project__nav-button--prev"
                  onClick={goToPrevious}
                  aria-label="Projet précédent"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="featured-project__nav-button featured-project__nav-button--next"
                  onClick={goToNext}
                  aria-label="Projet suivant"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </>
            )}
          </figure>
        )}

        <div className="featured-project__footer">
          <div className="featured-project__actions">
            {project.projet && (
              <a
                href={project.projet}
                target="_blank"
                rel="noopener noreferrer"
                className="featured-project__button featured-project__button--primary"
                aria-label={`Voir le projet ${project.title}`}
              >
                Tester le projet
              </a>
            )}

            <Link
              to="/projects"
              className="featured-project__button featured-project__button--secondary"
            >
              Voir les autres projets
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
