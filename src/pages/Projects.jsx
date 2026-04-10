import { useState, useEffect, useMemo } from "react";
import ProjectsFilter from "../components/projects/ProjectsFilter.jsx";
import ProjectCard from "../components/projects/ProjectCard.jsx";
import useProjects from "../hooks/useProjects.js";
import useContent from "../hooks/useContent.js";
import {
  buildEmptyFilters,
  matchesProjectFilters,
} from "../utils/projectFilters.js";
import ProjectsCategorySection from "../components/projects/ProjectsCategorySection.jsx";
import PageHero from "../components/common/PageHero.jsx";
import RevealOnScroll from "../components/common/RevealOnScroll.jsx";
import "./projects.scss";

export default function Projects() {
  const { content } = useContent();
  const { projects, loading, error } = useProjects("/data/projects.json");

  const [filters, setFilters] = useState(buildEmptyFilters);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const ui = content?.ui;
  const pageData = content?.pages?.projectsPage;
  const seo = pageData?.seo;
  const hero = pageData?.hero;

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
    if (hasActiveFilters || (projects?.formations || []).length === 0) {
      return null;
    }

    return (
      <RevealOnScroll
        as="section"
        className="projects__toggle"
        variant="section"
        delay={80}
      >
        <button
          type="button"
          className="projects__toggle-button"
          onClick={() => setShowAllProjects((prev) => !prev)}
          aria-expanded={showAllProjects}
          aria-controls="projects-formations-section"
        >
          {showAllProjects ? pageData?.toggle?.hide : pageData?.toggle?.show}
        </button>
      </RevealOnScroll>
    );
  };

  return (
    <main className="projects">
      <PageHero
        hero={hero}
        className="projects__header"
        eyebrowClassName="projects__eyebrow"
        titleClassName="projects__title"
        subtitleClassName="projects__subtitle"
        descriptionClassName="projects__description"
        reveal
        revealVariant="hero"
        revealDelay={0}
      />

      <section
        className="projects__filters"
        aria-label={pageData?.filters?.title}
      >
        <ProjectsFilter
          onFilterChange={setFilters}
          projects={allProjects}
          reveal
          revealVariant="section"
          revealDelay={60}
        />
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
            <ProjectsCategorySection
              category={pageData?.categories?.professionnels}
              items={filteredProfessionnels}
            >
              {filteredProfessionnels.map((project, index) => (
                <RevealOnScroll
                  key={project.id}
                  as="article"
                  className="projects__card-container"
                  variant="card"
                  delay={120 + index * 90}
                  threshold={0.12}
                  rootMargin="0px 0px -6% 0px"
                >
                  <span className="projects__window-label" aria-hidden="true">
                    {project.windowLabel ?? "project-card"}
                  </span>
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </ProjectsCategorySection>

            <ProjectsCategorySection
              category={pageData?.categories?.personnels}
              items={filteredPersonnels}
            >
              {filteredPersonnels.map((project, index) => (
                <RevealOnScroll
                  key={project.id}
                  as="article"
                  className="projects__card-container"
                  variant="card"
                  delay={120 + index * 90}
                  threshold={0.12}
                  rootMargin="0px 0px -6% 0px"
                >
                  <span className="projects__window-label" aria-hidden="true">
                    {project.windowLabel ?? "project-card"}
                  </span>
                  <ProjectCard project={project} />
                </RevealOnScroll>
              ))}
            </ProjectsCategorySection>

            {renderFormationToggle()}

            {shouldShowFormations && (
              <ProjectsCategorySection
                id="projects-formations-section"
                category={pageData?.categories?.formations}
                items={filteredFormations}
              >
                {filteredFormations.map((project, index) => (
                  <RevealOnScroll
                    key={project.id}
                    as="article"
                    className="projects__card-container"
                    variant="card"
                    delay={120 + index * 90}
                    threshold={0.12}
                    rootMargin="0px 0px -6% 0px"
                  >
                    <span className="projects__window-label" aria-hidden="true">
                      {project.windowLabel ?? "project-card"}
                    </span>
                    <ProjectCard project={project} />
                  </RevealOnScroll>
                ))}
              </ProjectsCategorySection>
            )}

            {shouldShowFormations &&
              filteredFormations.length > 0 &&
              renderFormationToggle()}
          </>
        )}
      </section>
    </main>
  );
}
