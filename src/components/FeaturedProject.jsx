import { Link } from "react-router-dom";
import "./featuredProject.scss";

export default function FeaturedProject({ project, showProject }) {
  if (!project) return null;

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

  return (
    <article
      className={`featured-project featured-project--proof ${showProject ? "is-visible" : ""}`}
      aria-labelledby={`featured-project-title-${project.id}`}
    >
      <div className="featured-project__body">
        <div className="featured-project__intro">
          <p className="featured-project__eyebrow">Projet à la Une !</p>

          <h2
            id={`featured-project-title-${project.id}`}
            className="featured-project__title"
          >
            {project.title}
          </h2>

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
          </figure>
        )}

        <div className="featured-project__actions">
          {project.projet && (
            <a
              href={project.projet}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-project__button featured-project__button--primary"
              aria-label={`Tester le projet ${project.title}`}
            >
              Tester le Quiz !
            </a>
          )}

          <Link
            to="/projects"
            className="featured-project__button featured-project__button--secondary"
          >
            Voir les projets !
          </Link>
        </div>
      </div>
    </article>
  );
}
