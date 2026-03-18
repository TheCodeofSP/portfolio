import { useState, useEffect, useMemo } from "react";
import Filter from "../components/Filter.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import useProjects from "../hooks/useProjects.js";
import useContent from "../hooks/useContent.js";
import {
  buildEmptyFilters,
  matchesProjectFilters,
} from "../utils/projectFilters.js";
import "./projects.scss";

export default function Projects() {
  const { content } = useContent();
  const { projects, loading, error } = useProjects("/data/projects.json");

  const [filters, setFilters] = useState(buildEmptyFilters);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const ui = content?.ui;
  const pageData = content?.projectsPage;
  const seo = pageData?.seo;

  useEffect(() => {
    if (!seo) return;

    document.title = seo.title;

    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute("content", seo.description);
    }
  }, [seo]);

  const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

  const allProjects = useMemo(() => {
    return [
      ...(projects?.formations || []),
      ...(projects?.personnels || []),
      ...(projects?.professionnels || []),
    ];
  }, [projects]);

  const filteredFormations = useMemo(() => {
    return [...(projects?.formations || [])]
      .sort(sortByDateDesc)
      .filter((project) => matchesProjectFilters(project, filters));
  }, [projects?.formations, filters]);

  const filteredPersonnels = useMemo(() => {
    return [...(projects?.personnels || [])]
      .sort(sortByDateDesc)
      .filter((project) => matchesProjectFilters(project, filters));
  }, [projects?.personnels, filters]);

  const filteredProfessionnels = useMemo(() => {
    return [...(projects?.professionnels || [])]
      .sort(sortByDateDesc)
      .filter((project) => matchesProjectFilters(project, filters));
  }, [projects?.professionnels, filters]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((values) => values.length > 0);
  }, [filters]);

  const shouldShowFormations = showAllProjects || hasActiveFilters;

  const totalVisibleProjects =
    (shouldShowFormations ? filteredFormations.length : 0) +
    filteredPersonnels.length +
    filteredProfessionnels.length;

  const renderFormationToggle = () => {
    if (hasActiveFilters || (projects?.formations || []).length === 0)
      return null;

    return (
      <section className="projects__toggle">
        <button
          type="button"
          className="projects__toggle-button"
          onClick={() => setShowAllProjects((prev) => !prev)}
          aria-expanded={showAllProjects}
          aria-controls="projects-formations-section"
        >
          {showAllProjects ? pageData?.toggle?.hide : pageData?.toggle?.show}
        </button>
      </section>
    );
  };

  const renderCategory = (categoryKey, items, options = {}) => {
    if (!items.length) return null;

    const { id } = options;
    const category = pageData?.categories?.[categoryKey];

    return (
      <section id={id} className="projects__category">
        <header className="projects__category-head">
          <h2 className="projects__category-title">{category?.title}</h2>
          <p className="projects__category-description">
            {category?.description}
          </p>
        </header>

        <div className="projects__row">
          {items.map((project) => (
            <article key={project.id} className="projects__card-container">
              <ProjectCard project={project} />
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="projects">
      <header className="projects__header header-page">
        <h1 className="page-title">{pageData?.title}</h1>
        <p className="page-subtitle">{pageData?.subtitle}</p>

        <section
          className="projects__intro"
          aria-label="Introduction"
        ></section>
      </header>

      <section
        className="projects__filters"
        aria-label={pageData?.filters?.title}
      >
        <Filter onFilterChange={setFilters} projects={allProjects} />
      </section>

      <section className="projects__list" aria-live="polite">
        {loading ? (
          <p>{pageData?.messages?.loading || ui?.loading || "Chargement..."}</p>
        ) : error ? (
          <p>
            {ui?.errorPrefix || "Erreur :"} {error.message}
          </p>
        ) : totalVisibleProjects === 0 ? (
          <p>{pageData?.messages?.empty}</p>
        ) : (
          <>
            {renderCategory("professionnels", filteredProfessionnels)}
            {renderCategory("personnels", filteredPersonnels)}

            {renderFormationToggle()}

            {shouldShowFormations &&
              renderCategory("formations", filteredFormations, {
                id: "projects-formations-section",
              })}

            {shouldShowFormations &&
              filteredFormations.length > 0 &&
              renderFormationToggle()}
          </>
        )}
      </section>
    </main>
  );
}
